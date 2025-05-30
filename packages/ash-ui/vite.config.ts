import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, '/index.ts'),
      name: 'ash-ui',
      formats: ['es'],
      fileName: 'my-lib',
    },
  },
})
