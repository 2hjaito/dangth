import fs from 'fs'
import path from 'path'
import { TutorialConfigItem } from '../../config/tutorial.config'
import { getMarkdownBaseDir, getMarkdownContent } from '../core/mdx'
import { DEFAULT_LOCALE, type SupportedLocale } from '@/lib/i18n'

export interface TutorialData {
  slug: string
  title: string
  subtitle?: string
  contentHtml: string,
  readingTime: number,
  lastUpdated: string
  locale?: SupportedLocale
  sourcePath?: string
}

export interface TutorialNavItem {
  text: string
  link?: string
  path: string[] // breadcrumb
}

export function getAllTutorialSlugs(locale: string = DEFAULT_LOCALE): { slug: string[] }[] {
  const { dirPath } = getMarkdownBaseDir('tutorials', locale)
  if (!fs.existsSync(dirPath)) return []

  const slugs: { slug: string[] }[] = []

  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir)
    for (const entry of entries) {
      const fullPath = path.join(dir, entry)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (entry.endsWith('.md')) {
        const relativePath = path.relative(dirPath, fullPath)
        const slugParts = relativePath.replace(/\.md$/, '').split(path.sep)
        slugs.push({ slug: slugParts })
      }
    }
  }

  walk(dirPath)
  return slugs
}

export function getTutorial(slug: string, locale: string = DEFAULT_LOCALE) {
  return getMarkdownContent('tutorials', slug, locale)
}


export function flattenSidebar(
  items: TutorialConfigItem[],
  parentPath: string[] = []
): TutorialNavItem[] {
  let result: TutorialNavItem[] = []

  for (const item of items) {
    const currentPath = [...parentPath, item.text]

    if (item.link) {
      result.push({ text: item.text, link: item.link, path: currentPath })
    }

    if (item.children) {
      result = result.concat(flattenSidebar(item.children, currentPath))
    }
  }

  return result
}

export function findNavContext(
  flat: TutorialNavItem[],
  currentSlug: string
) {
  const index = flat.findIndex((item) =>
    item.link === `/tutorial/${currentSlug}`
  )

  if (index === -1) return null

  return {
    current: flat[index],
    previous: flat[index - 1] ?? null,
    next: flat[index + 1] ?? null,
  }
}
