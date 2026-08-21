'use client'

import Link from 'next/link'
import { TutorialConfigItem } from '@/config/tutorial.config'
import { SidebarIcon } from './SidebarIcon'
import { useEffect, useState } from 'react'
import { localizePath, parseLocaleFromPathname } from '@/lib/i18n'
import { usePathname } from 'next/navigation'

interface Props {
  activeSlug: string
  tree: TutorialConfigItem[]
}

export default function TutorialSidebar({ activeSlug, tree }: Props) {
  const pathname = usePathname()
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})
  const [locale, setLocale] = useState('vi')

  const toggle = (key: string) => {
    setOpenMap(prev => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    const openKeys = findOpenKeysForSlug(tree, activeSlug) ?? []
    const initialMap = Object.fromEntries(openKeys.map((key) => [key, true]))
    setOpenMap(initialMap)
  }, [activeSlug, tree])

  useEffect(() => {
    const parsed = parseLocaleFromPathname(pathname)
    setLocale(parsed.locale)
  }, [pathname])

  const renderItems = (items: TutorialConfigItem[], level = 0) => (
    <ul className={`space-y-1 ${level > 1 ? 'ml-2 mt-2 border-l border-gray-200 pl-2.5 dark:border-gray-800' : ''}`}>
      {items.map((item, idx) => {
        const key = `${item.text}-${idx}`
        const isOpen = openMap[key]
        const hasChildren = !!item.children?.length
        const isCollapsible = item.collapsible !== false && hasChildren

        if (isCollapsible) {
          return (
            <li key={key}>
              <div
                onClick={() => toggle(key)}
                className="mt-3 flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500 transition hover:bg-gray-100/80 hover:text-black dark:text-gray-400 dark:hover:bg-gray-800/70 dark:hover:text-white"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <SidebarIcon icon={item.icon} />
                  <span className="truncate">{item.text}</span>
                </div>
                <svg
                  className={`h-3 w-3 shrink-0 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              {isOpen && renderItems(item.children!, level + 1)}
            </li>
          )
        }

        if (hasChildren) {
          return (
            <li key={key}>
              <div className="mb-1 mt-4 truncate px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">
                {item.text}
              </div>
              {renderItems(item.children!, level + 1)}
            </li>
          )
        }

        return (
          <li key={key}>
            <Link
              href={item.link ? localizePath(item.link, locale) : '#'}
              title={item.text}
              className={`group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] leading-5 transition-all ${activeSlug === item.link?.replace('/tutorial/', '')
                ? 'bg-blue-50 font-semibold text-blue-600 dark:bg-blue-950/70 dark:text-blue-300'
                : 'text-gray-700 hover:bg-gray-100/80 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800/70 dark:hover:text-white'
                }`}
            >
              <span className="shrink-0">
                <SidebarIcon icon={item.icon} />
              </span>
              <span className="min-w-0 flex-1 truncate">{item.text}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return <nav className="px-2 py-2">{renderItems(tree)}</nav>
}

function findOpenKeysForSlug(
  items: TutorialConfigItem[],
  targetSlug: string,
  path: string[] = []
): string[] | null {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const key = `${item.text}-${i}`

    if (item.link === `/tutorial/${targetSlug}` || item.link === targetSlug) {
      return path
    }

    if (item.children) {
      const result = findOpenKeysForSlug(item.children, targetSlug, [...path, key])
      if (result) return result
    }
  }

  return null
}
