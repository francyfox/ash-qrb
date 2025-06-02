import { resolve } from 'node:path'
import ui from '@nuxt/ui/vite'
import vue from '@vitejs/plugin-vue'
import { glob } from 'glob'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const entries: Record<string, string> = {}

for (const file of glob.sync('src/components/**/*.ts')) {
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
    ui({
      components: {
        dts: true,
        resolvers: [
          IconsResolver({
            customCollections: ['ash'],
          }),
        ],
      },
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        ash: FileSystemIconLoader('./src/assets/icons', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
    }),
    dts({
      insertTypesEntry: true,
      tsconfigPath: 'tsconfig.build.json',
      cleanVueFileName: true,
      clearPureImport: true,
    }),
  ],
  build: {
    cssCodeSplit: true,
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      entry: entries,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
