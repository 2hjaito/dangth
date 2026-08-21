'use client'

import Giscus from '@giscus/react'
import { usePathname } from 'next/navigation'
import { GISCUS } from '@/config/config'

export default function GiscusComments() {
  const pathname = usePathname()

  const initialTheme =
    typeof window !== 'undefined' && localStorage.getItem('dark-mode') === 'dark'
      ? GISCUS.dark
      : GISCUS.light

  // Bỏ locale ('/en', '/vi') khỏi pathname
  const pathWithoutLocale = pathname.replace(/^\/(en|vi)/, '')

  // Normalize path: fallback thành '/' nếu rỗng
  const normalizedPath = pathWithoutLocale === '' ? '/' : pathWithoutLocale

  // term sẽ luôn là: dangth/... (ví dụ: dangth/post/a)
  let term = `${GISCUS.termPrefix}${normalizedPath}`

  switch (term) {
    case "dangth/tutorial":
      term = "dangth/tutorial/welcome"
      break;
  }


  return (
    <Giscus
      id={GISCUS.id}
      repo={GISCUS.repo}
      repoId={GISCUS.repoId}
      category={GISCUS.category}
      categoryId={GISCUS.categoryId}
      mapping="specific"
      term={term}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={initialTheme}
      lang="vi"
      loading="lazy"
    />
  )
}
