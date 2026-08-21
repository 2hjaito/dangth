export const SUPPORTED_LOCALES = ['vi', 'en', 'zh'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = 'vi'

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return !!value && SUPPORTED_LOCALES.includes(value as SupportedLocale)
}

export function normalizeLocale(value: string | null | undefined): SupportedLocale {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE
}

export async function getRequestLocale() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  return normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)
}

export function parseLocaleFromPathname(pathname: string) {
  const matched = pathname.match(/^\/(vi|en|zh)(?=\/|$)/)
  const locale = normalizeLocale(matched?.[1])
  const pathnameWithoutLocale = matched
    ? pathname.replace(/^\/(vi|en|zh)(?=\/|$)/, '') || '/'
    : pathname

  return {
    locale,
    pathnameWithoutLocale,
    hasLocalePrefix: Boolean(matched),
  }
}

export function localizePath(pathname: string, locale: string) {
  const normalizedLocale = normalizeLocale(locale)
  const safePathname = pathname.startsWith('/') ? pathname : `/${pathname}`

  if (normalizedLocale === DEFAULT_LOCALE) {
    return safePathname
  }

  return `/${normalizedLocale}${safePathname}`
}
