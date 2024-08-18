import type { LocalePrefix, Pathnames } from 'next-intl/routing';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'ru'] as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/[lang]': {
    en: '/en',
    ru: '/ru'
  }
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';

export const port = process.env.PORT || 3000;
export const host = `http://localhost:${port}`;