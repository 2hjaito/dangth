// lib/tutorial-nav.ts

import { TutorialConfigItem } from '@/config/tutorial.config'

export interface TutorialNavItem {
  text: string
  link?: string
  path: string[] // breadcrumb
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
