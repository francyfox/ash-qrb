import { resolve } from 'node:path'
import ui from '@nuxt/ui/vite'
import vue from '@vitejs/plugin-vue'
import { glob } from 'glob'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

const entries: Record<string, string> = {}
const fileNameRegex = /([^/]+)\.vue$/

for (const file of glob.sync('lib/components/**/*.vue')) {
  const match = file.match(fileNameRegex)
  if (!match) continue
  const filename = match[1]
  entries[file] = file
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      '~lib/': `${resolve(__dirname, 'lib')}/`,
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
      include: ['lib', './auto-imports.d.ts'],
      tsconfigPath: 'tsconfig.build.json',
      cleanVueFileName: true,
      clearPureImport: true,
      // beforeWriteFile: (filePath, content) => {
      //   const match = filePath.match(/([^/]+)\.d.ts$/)
      //   if (!match) return
      //   const name = match[1]
      //   return {
      //     filePath: resolve(__dirname, `dist/${name}.d.ts`),
      //     content,
      //   }
      // },
    }),
    libInjectCss(),
  ],
  build: {
    cssCodeSplit: true,
    emptyOutDir: true,
    outDir: 'dist',
    target: 'esnext',
    lib: {
      entry: {
        'lib/index': resolve(__dirname, 'lib/index.js'),
        ...entries,
      },
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'tailwindcss'],
      output: {
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
