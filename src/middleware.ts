import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported locales
const locales = ['ar', 'en']

// Default locale
const defaultLocale = 'ar'

// Get the preferred locale from the Accept-Language header
function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  
  if (!acceptLanguage) {
    return defaultLocale
  }

  // Parse Accept-Language header
  const languages = acceptLanguage.split(',').map(lang => {
    const [locale, q = '1'] = lang.trim().split(';q=')
    return {
      locale: locale.split('-')[0], // Get the base language code
      quality: parseFloat(q)
    }
  }).sort((a, b) => b.quality - a.quality)

  // Find the first supported locale
  for (const lang of languages) {
    if (locales.includes(lang.locale)) {
      return lang.locale
    }
  }

  return defaultLocale
}

// Check if the pathname starts with a supported locale
function hasLocale(pathname: string): boolean {
  return locales.some(locale => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API routes, static files, and internal Next.js routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  if (hasLocale(pathname)) {
    // If it's Arabic, ensure proper RTL handling
    if (pathname.startsWith('/ar/') || pathname === '/ar') {
      const response = NextResponse.next()
      response.headers.set('Content-Language', 'ar')
      response.headers.set('X-Direction', 'rtl')
      return response
    }
    return NextResponse.next()
  }

  // Get the preferred locale from the request
  const preferredLocale = getPreferredLocale(request)
  
  // Redirect to the preferred locale
  const locale = locales.includes(preferredLocale) ? preferredLocale : defaultLocale
  
  // Create the new URL with the locale
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  
  // Redirect to the localized URL
  const response = NextResponse.redirect(newUrl)
  
  // Set appropriate headers for Arabic content
  if (locale === 'ar') {
    response.headers.set('Content-Language', 'ar')
    response.headers.set('X-Direction', 'rtl')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
