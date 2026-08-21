'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TOC({ headings }: { headings: Heading[] }) {
  const pathname = usePathname()

  return (
    <aside className="hidden xl:block fixed top-[100px] right-8 min-w-[200px] max-h-[calc(100vh-120px)] overflow-y-auto text-sm text-gray-600 dark:text-[#E5E7EB] mb-3">
      <strong className="block text-base text-gray-800 dark:text-[#E5E7EB] mb-3">Mục lục</strong>
      <ul className="space-y-1">
        {headings.map((heading, index) => (
          <li
            key={index}
            className="list-none leading-relaxed dark:text-[#E5E7EB]"
            style={{ marginLeft: `${(heading.level - 2) * 16}px` }}
          >
            <a
              href={`${pathname}#${heading.id}`}
              className="hover:text-blue-500 no-underline transition-colors duration-150 dark:text-[#E5E7EB]"
            >
              {heading.text}
            </a>
          </li>
        ))}

        <li className="list-none leading-relaxed mt-2">
          <a
            href={`${pathname}#comments`}
            className="hover:text-blue-500 no-underline transition-colors duration-150 dark:text-[#E5E7EB]"
          >
            Thảo luận
          </a>
        </li>
      </ul>
    </aside>
  )
}
