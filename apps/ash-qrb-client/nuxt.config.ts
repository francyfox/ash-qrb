// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from './config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: config.PORT,
  },
  runtimeConfig: {
    public: config,
  },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
