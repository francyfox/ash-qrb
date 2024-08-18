import { locales } from '@root/module/i18n/i18n.config';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({locale}) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if (!locales.includes(locale as any)) notFound();
  
  return {
    messages: (await import(`./module/i18n/locales/${locale}.json`)).default
  };
});