import tailwindcss from 'tailwindcss'
// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from './config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
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
  modules: ['@nuxt/ui', '@nuxt/image', '@pinia/nuxt'],
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
})
