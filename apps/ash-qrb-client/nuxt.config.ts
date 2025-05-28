// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from './config'
import locales from './locales'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-03-03',
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: config.PORT,
  },
  runtimeConfig: {
    public: config,
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    'dayjs-nuxt',
  ],
  app: {
    pageTransition: false,
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  css: [
    '@fontsource-variable/sofia-sans',
    '~/assets/styles/tailwind.pcss',
    '~/assets/styles/styles.pcss',
  ],
  ui: {
    colorMode: false,
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
      'postcss-nested': {},
    },
  },
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: {
          to: 'http://localhost:3000/api/**', // make sure this is an ENV driven variable if production does not match
        },
      },
    },
  },
  image: {
    cloudinary: {
      baseURL: `https://res.cloudinary.com/${config.CLOUDINARY_CLOUD_NAME}/image/upload/`,
    },
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    locales,
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    strategy: 'no_prefix',
  },
  icon: {
    localApiEndpoint: '/_nuxt_icon',
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
    serverBundle: {
      collections: ['lucide'],
    },
    customCollections: [
      {
        prefix: 'ash',
        dir: './app/assets/images/icons',
      },
    ],
  },
})
