import { config } from '@/config.ts'
import { genericOAuth } from 'better-auth/plugins'

export const socialProviders = {
  google: {
    clientId: config.PROVIDER_GOOGLE_CLIENT_ID,
    clientSecret: config.PROVIDER_GOOGLE_CLIENT_SECRET,
  },
}

export const customProviders = genericOAuth({
  config: [
    {
      providerId: 'yandex-id',
      clientId: config.PROVIDER_YANDEX_CLIENT_ID,
      clientSecret: config.PROVIDER_YANDEX_CLIENT_SECRET,
      authorizationUrl: 'https://oauth.yandex.ru/authorize',
      tokenUrl: 'https://oauth.yandex.ru/token',
      userInfoUrl: 'https://login.yandex.ru/info',
      redirectURI: `${config.CLIENT_APP_URL}/api/auth/callback/yandex-id`,
      scopes: ['login:email'],
    },
  ],
})
