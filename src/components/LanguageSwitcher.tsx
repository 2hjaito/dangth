'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { localizePath, parseLocaleFromPathname, SUPPORTED_LOCALES, type SupportedLocale } from '@/lib/i18n'

const localeLabelMap: Record<SupportedLocale, string> = {
  vi: 'VI',
  en: 'EN',
  zh: '中文',
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { locale, pathnameWithoutLocale } = parseLocaleFromPathname(pathname)

  const clearCloseTimer = () => {
    if (!closeTimerRef.current) return
    clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }

  const openMenu = () => {
    clearCloseTimer()
    setOpen(true)
  }

  const closeMenuWithDelay = () => {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      setOpen(false)
    }, 180)
  }

  useEffect(() => {
    return () => {
      clearCloseTimer()
    }
  }, [])

  const handleChangeLocale = (nextLocale: SupportedLocale) => {
    if (nextLocale === locale) {
      setOpen(false)
      return
    }

    const localizedPath = localizePath(pathnameWithoutLocale, nextLocale)
    const query = searchParams.toString()
    const target = query ? `${localizedPath}?${query}` : localizedPath

    document.cookie = `NEXT_LOCALE=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
    document.documentElement.lang = nextLocale
    setOpen(false)

    router.push(target)
    window.requestAnimationFrame(() => {
      router.refresh()
    })
  }

  return (
    <div
      className="fixed right-2 top-2 z-[9998]"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenuWithDelay}
      onFocus={openMenu}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          clearCloseTimer()
          setOpen(false)
        }
      }}
    >
      <div className="relative" tabIndex={-1}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="min-w-[38px] rounded-md bg-white/85 px-2 py-1 text-xs font-semibold text-[#1F2937] shadow-sm backdrop-blur-sm transition hover:bg-white dark:bg-[#404B5D]/85 dark:text-[#E5E7EB] dark:hover:bg-[#4A5363]"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="open language menu"
          title="language"
        >
          {localeLabelMap[locale]}
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 mt-1 w-[64px] rounded-md bg-white/95 p-1 shadow-md backdrop-blur dark:bg-[#404B5D]/95"
          >
            {SUPPORTED_LOCALES.filter((item) => item !== locale).map((item) => {
              return (
                <button
                  key={item}
                  type="button"
                  role="menuitem"
                  onClick={() => handleChangeLocale(item)}
                  className="block w-full rounded px-2 py-1 text-left text-xs font-semibold text-[#6b7280] transition-colors hover:bg-[#f3f4f6]/70 hover:text-[#111827] dark:text-[#c5c7cc] dark:hover:bg-[#4A5363]/70 dark:hover:text-[#E5E7EB]"
                  aria-label={`switch language to ${item}`}
                  title={item}
                >
                  {localeLabelMap[item]}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
