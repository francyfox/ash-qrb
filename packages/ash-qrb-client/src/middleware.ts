import { locales } from '@root/module/i18n/i18n.config';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale: 'en'
});

export default async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return
  }

  if (request.nextUrl.locale === 'default') {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en'
    
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
    )
  }
}