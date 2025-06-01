import { resolve } from 'node:path'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import ui from '@nuxt/ui/vite'
import vue from '@vitejs/plugin-vue'
import { glob } from 'glob'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const entries: Record<string, string> = {}

for (const file of glob.sync('src/exports/**/*.ts')) {
  entries[file.replace(/\\/g, '/').replace('src/', '').replace('.ts', '')] =
    file
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    ui(),
    VueI18n({
      fullInstall: false,
      compositionOnly: true,
      include: [resolve(process.cwd(), 'locales/**')],
    }),
    dts({
      tsconfigPath: 'tsconfig.build.json',
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      entry: entries,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
})
