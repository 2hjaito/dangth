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
import 'katex/dist/katex.min.css'

export type MarkdownType = 'posts' | 'tutorials'

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
}

function toInertTutorialScripts(html: string) {
  return html.replace(/<script(\s|>)/g, '<script data-live-script="true" type="text/plain"$1')
}

export async function getMarkdownContent(
  type: MarkdownType,
  slug: string
): Promise<MarkdownContent | null> {
  const baseDir = path.resolve(process.cwd(), 'content', type)
  const filePath = path.join(baseDir, `${slug}.md`)

  console.log("📁 Looking for:", filePath)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)
  const firstHeadingMatch = content.match(/^#\s+(.+)$/m)
  const fallbackTitle = firstHeadingMatch?.[1]?.trim() ?? ''
  const normalizedContent = data.title
    ? content
    : content.replace(/^#\s+.+\n+(?:\n)*/m, '')
  const resolvedTitle = data.title ?? fallbackTitle

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
    .process(normalizedContent)

  const contentHtml = (type === 'tutorials'
    ? toInertTutorialScripts(processed.toString())
    : processed.toString()
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
    lastUpdated: stat.mtime.toISOString()
  }
}
