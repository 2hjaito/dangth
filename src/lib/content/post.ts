import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getMarkdownBaseDir, getMarkdownContent } from '../core/mdx'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/i18n'
import 'katex/dist/katex.min.css'

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

// Lấy tất cả slug từ thư mục posts
export function getAllPostSlugs(locale: string = DEFAULT_LOCALE): { slug: string }[] {
  const { dirPath } = getMarkdownBaseDir('posts', locale)
  if (!fs.existsSync(dirPath)) return []

  return fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: file.replace(/\.md$/, '')
    }))
}


// Load nội dung bài viết từ slug
export function getPost(slug: string, locale: string = DEFAULT_LOCALE) {
  return getMarkdownContent('posts', slug, locale)
}

export async function getAllPostsMeta(locale: string = DEFAULT_LOCALE) {
  const { dirPath } = getMarkdownBaseDir('posts', locale)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)

  return files
    .filter((file) => file.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const filePath = path.join(dirPath, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)

      return {
        slug,
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
