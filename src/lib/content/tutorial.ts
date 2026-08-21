import fs from 'fs'
import path from 'path'
import { TutorialConfigItem } from '../../config/tutorial.config'
import { getMarkdownContent } from '../core/mdx'


const tutorialsDir = path.join(process.cwd(), 'docs/tutorials')

export interface TutorialData {
  slug: string
  title: string
  subtitle?: string
  contentHtml: string,
  readingTime: number,
  lastUpdated: string
}

export interface TutorialNavItem {
  text: string
  link?: string
  path: string[] // breadcrumb
}

export function getAllTutorialSlugs(): { slug: string[] }[] {
  const slugs: { slug: string[] }[] = []

  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir)
    for (const entry of entries) {
      const fullPath = path.join(dir, entry)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (entry.endsWith('.md')) {
        const relativePath = path.relative(tutorialsDir, fullPath)
        const slugParts = relativePath.replace(/\.md$/, '').split(path.sep)
        slugs.push({ slug: slugParts })
      }
    }
  }

  walk(tutorialsDir)
  return slugs
}

export function getTutorial(slug: string) {
  return getMarkdownContent('tutorials', slug)
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
