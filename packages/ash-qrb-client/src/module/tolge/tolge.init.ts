import { DevTools, Tolgee, FormatSimple } from '@tolgee/react';
import { ENV } from '@root/env';
import en from '@root/module/tolge/i18n/en.json';
import ru from '@root/module/tolge/i18n/ru.json';

export const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    defaultLanguage: 'en',
    apiKey: ENV.NEXT_PUBLIC_TOLGEE_API_KEY,
    apiUrl: ENV.NEXT_PUBLIC_TOLGEE_API_URL,
    staticData: {
      en,
      ru,
    },
    fallbackLanguage: {
      'en-US': 'en',
      'ru-RU': 'ru',
    },
  });
