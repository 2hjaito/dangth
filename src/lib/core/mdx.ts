import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import remarkAdmonition from '../plugins/remarkAdmonition'
import { estimateReadingTime } from '@/utils/readingTime'
import { DEFAULT_LOCALE, normalizeLocale, type SupportedLocale } from '@/lib/i18n'
import 'katex/dist/katex.min.css'

export type MarkdownType = 'posts' | 'tutorials' | 'pages'

export interface MarkdownContent {
  slug: string
  title: string
  subtitle?: string
  author?: string
  date?: string
  image?: string | null
  tags?: string[]
  contentHtml: string
  contentText: string
  readingTime: number
  lastUpdated: string
  locale: SupportedLocale
  sourcePath: string
}

export interface MarkdownFileLocation {
  filePath: string
  locale: SupportedLocale
}

function toInertTutorialScripts(html: string) {
  return html.replace(/<script(\s|>)/g, '<script data-live-script="true" type="text/plain"$1')
}

export async function markdownToHtml(content: string) {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkAdmonition)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex, { strict: false })
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return processed.toString()
}

export function getMarkdownBaseDir(type: MarkdownType, locale?: string) {
  const requestedLocale = normalizeLocale(locale)
  const localizedDir = path.resolve(process.cwd(), 'docs', requestedLocale, type)
  if (fs.existsSync(localizedDir)) {
    return { dirPath: localizedDir, locale: requestedLocale as SupportedLocale }
  }

  const defaultLocalizedDir = path.resolve(process.cwd(), 'docs', DEFAULT_LOCALE, type)
  if (fs.existsSync(defaultLocalizedDir)) {
    return { dirPath: defaultLocalizedDir, locale: DEFAULT_LOCALE }
  }

  const legacyDir = path.resolve(process.cwd(), 'docs', type)
  return { dirPath: legacyDir, locale: DEFAULT_LOCALE }
}

export function resolveMarkdownFileLocation(
  type: MarkdownType,
  slug: string,
  locale?: string
): MarkdownFileLocation | null {
  const requestedLocale = normalizeLocale(locale)
  const localizedPath = path.resolve(process.cwd(), 'docs', requestedLocale, type, `${slug}.md`)
  if (fs.existsSync(localizedPath)) {
    return { filePath: localizedPath, locale: requestedLocale }
  }

  if (requestedLocale !== DEFAULT_LOCALE) {
    const fallbackViPath = path.resolve(process.cwd(), 'docs', DEFAULT_LOCALE, type, `${slug}.md`)
    if (fs.existsSync(fallbackViPath)) {
      return { filePath: fallbackViPath, locale: DEFAULT_LOCALE }
    }
  }

  const legacyPath = path.resolve(process.cwd(), 'docs', type, `${slug}.md`)
  if (fs.existsSync(legacyPath)) {
    return { filePath: legacyPath, locale: DEFAULT_LOCALE }
  }

  return null
}

export async function getMarkdownContent(
  type: MarkdownType,
  slug: string,
  locale?: string
): Promise<MarkdownContent | null> {
  const location = resolveMarkdownFileLocation(type, slug, locale)
  if (!location) return null

  const { filePath, locale: resolvedLocale } = location

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)
  const firstHeadingMatch = content.match(/^#\s+(.+)$/m)
  const fallbackTitle = firstHeadingMatch?.[1]?.trim() ?? ''
  const normalizedContent = data.title
    ? content
    : content.replace(/^#\s+.+\n+(?:\n)*/m, '')
  const resolvedTitle = data.title ?? fallbackTitle

  const processedHtml = await markdownToHtml(normalizedContent)

  const contentHtml = (type === 'tutorials'
    ? toInertTutorialScripts(processedHtml)
    : processedHtml
  ).replace(/<img([^>]+?)>/g, '<img class="zoom-img"$1>')
  const contentText = normalizedContent.replace(/[#_*>\-\n`]/g, '')
  const readingTime = estimateReadingTime(contentText)
  const stat = fs.statSync(filePath)

  const imgMatch = contentHtml.match(/<img[^>]+src="([^">]+)"/)
  const firstImage = imgMatch ? imgMatch[1] : '@/public/images/avt.png'

  return {
    slug,
    title: resolvedTitle,
    subtitle: data.subtitle ?? '',
    author: data.author ?? '',
    date: typeof data.date === 'string' ? data.date : undefined,
    tags: data.tags ?? [],
    image: data.image ?? firstImage,
    contentHtml,
    contentText,
    readingTime,
    lastUpdated: stat.mtime.toISOString(),
    locale: resolvedLocale,
    sourcePath: path.relative(process.cwd(), filePath).replace(/\\/g, '/')
  }
}
