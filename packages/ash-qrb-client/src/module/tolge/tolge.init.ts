import { DevTools, Tolgee, FormatSimple } from '@tolgee/react';
import { ENV } from '@root/env';
export const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    defaultLanguage: 'en',
    apiKey: ENV.NEXT_PUBLIC_TOLGEE_API_KEY,
    apiUrl: ENV.NEXT_PUBLIC_TOLGEE_API_URL,
    staticData: {
      // @ts-ignore
      en: () => import('@root/module/tolge/i18n/en.json'),
      // @ts-ignore
      ru: () => import('@root/module/tolge/i18n/ru.json'),
    },
  });
