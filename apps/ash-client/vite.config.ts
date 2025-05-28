import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import 'vite-ssg'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      extensions: ['vue'],
      routeStyle: 'nuxt',
    }),
  ],
  ssgOptions: {
    script: 'async',
    dirStyle: process.env.NESTED_PAGES === 'true' ? 'nested' : 'flat',
    formatting: 'minify',
  },
})
