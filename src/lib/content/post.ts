import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getMarkdownBaseDir, getMarkdownContent } from '../core/mdx'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/i18n'
import 'katex/dist/katex.min.css'

type PostManifestItem = {
  routeSlug: string
  fileSlug: string
  filePath: string
}

export interface PostData {
  slug: string
  title: string
  subtitle?: string
  author?: string
  date: string
  contentHtml: string
  image?: string | null
  tags?: string[]
  readingTime?: number
  lastUpdated?: string
  locale?: SupportedLocale
  sourcePath?: string
}


export interface PostMeta {
  slug: string
  title: string
  subtitle?: string
  author?: string
  date: string
  image?: string | null
  tags?: string[]
  arxiv?: string | null
  published: boolean
}

function safeDate(value: any): string {
  if (!value) return ''
  const d = new Date(value)
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
}

function normalizeSlug(value: string) {
  return value.trim().replace(/^\/+|\/+$/g, '')
}

function buildPostManifest(locale: string = DEFAULT_LOCALE): PostManifestItem[] {
  const { dirPath } = getMarkdownBaseDir('posts', locale)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.md'))
  const seen = new Map<string, PostManifestItem>()

  for (const filename of files) {
    const fileSlug = filename.replace(/\.md$/, '')
    const filePath = path.join(dirPath, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    const configuredSlug = typeof data.slug === 'string' ? normalizeSlug(data.slug) : ''
    const routeSlug = configuredSlug || fileSlug

    if (!seen.has(routeSlug)) {
      seen.set(routeSlug, { routeSlug, fileSlug, filePath })
    }
  }

  return [...seen.values()]
}

// Lấy tất cả slug từ thư mục posts
export function getAllPostSlugs(locale: string = DEFAULT_LOCALE): { slug: string }[] {
  return buildPostManifest(locale).map((item) => ({ slug: item.routeSlug }))
}


// Load nội dung bài viết từ slug
export async function getPost(slug: string, locale: string = DEFAULT_LOCALE) {
  const routeSlug = normalizeSlug(slug)
  const manifest = buildPostManifest(locale)
  const target = manifest.find((item) => item.routeSlug === routeSlug)

  if (!target) return null

  const content = await getMarkdownContent('posts', target.fileSlug, locale)
  if (!content) return null

  if (target.routeSlug === target.fileSlug) {
    return content
  }

  return {
    ...content,
    slug: target.routeSlug,
  }
}

export async function getAllPostsMeta(locale: string = DEFAULT_LOCALE) {
  const manifest = buildPostManifest(locale)
  if (manifest.length === 0) return []

  return manifest
    .map((item) => {
      const filePath = item.filePath
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)

      return {
        slug: item.routeSlug,
        title: data.title ?? '',
        subtitle: data.subtitle ?? '',
        author: data.author ?? '',
        date: safeDate(data.date),
        image: data.image ?? null,
        tags: data.tags ?? [],
        arxiv: data.arxiv ?? null,
        published: data.published ?? true,
        locale,
        sourcePath: path.relative(process.cwd(), filePath).replace(/\\/g, '/')
      }
    })
}
