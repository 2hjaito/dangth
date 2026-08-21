import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DEFAULT_LOCALE, parseLocaleFromPathname } from '@/lib/i18n'

function normalizePostPath(pathname: string) {
  if (pathname === '/posts' || pathname === '/posts/') {
    return '/post'
  }

  if (pathname.startsWith('/posts/')) {
    const slug = pathname.slice('/posts/'.length)
    return slug ? `/${slug}` : '/post'
  }

  if (pathname.startsWith('/post/')) {
    const slug = pathname.slice('/post/'.length)
    return slug ? `/${slug}` : null
  }

  return null
}

function isBypassPath(pathname: string) {
  if (pathname.startsWith('/_next')) return true
  if (pathname.startsWith('/api')) return true
  if (pathname.startsWith('/favicon.ico')) return true
  if (pathname.startsWith('/robots.txt')) return true
  if (pathname.startsWith('/rss.xml')) return true
  return /\.[a-zA-Z0-9]+$/.test(pathname)
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isBypassPath(pathname)) {
    return NextResponse.next()
  }

  const parsed = parseLocaleFromPathname(pathname)

  if (parsed.hasLocalePrefix) {
    const legacyNoLocale = normalizePostPath(parsed.pathnameWithoutLocale)
    if (legacyNoLocale) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = parsed.locale === DEFAULT_LOCALE
        ? legacyNoLocale
        : `/${parsed.locale}${legacyNoLocale}`

      const response = NextResponse.redirect(redirectUrl)
      response.cookies.set('NEXT_LOCALE', parsed.locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      })

      return response
    }
  } else {
    const legacyPath = normalizePostPath(pathname)
    if (legacyPath) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = legacyPath
      return NextResponse.redirect(redirectUrl)
    }
  }

  if (parsed.hasLocalePrefix && parsed.locale === DEFAULT_LOCALE) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = parsed.pathnameWithoutLocale

    const response = NextResponse.redirect(redirectUrl)
    response.cookies.set('NEXT_LOCALE', DEFAULT_LOCALE, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })

    return response
  }

  if (parsed.hasLocalePrefix) {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = parsed.pathnameWithoutLocale

    const response = NextResponse.rewrite(rewriteUrl)
    response.cookies.set('NEXT_LOCALE', parsed.locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })

    return response
  }

  if (request.cookies.get('NEXT_LOCALE')?.value) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  response.cookies.set('NEXT_LOCALE', DEFAULT_LOCALE, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })

  return response
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
