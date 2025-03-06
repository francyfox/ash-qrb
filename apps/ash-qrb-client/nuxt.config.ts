// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from './config'
import locales from './locales'

export default defineNuxtConfig({
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
  modules: ['@nuxt/ui', '@nuxt/image', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/icon'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
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
    customCollections: [
      {
        prefix: 'ash',
        dir: './app/assets/images/icons'
      },
    ],
  },
})