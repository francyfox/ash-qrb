import { resolve } from 'node:path'
import ui from '@nuxt/ui/vite'

import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import { copyVueFilesPlugin } from './lib/plugin.ts'
// import { analyzer } from 'vite-bundle-analyzer'
// import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      '~lib/': `${resolve(__dirname, 'lib')}/`,
    },
  },
  plugins: [
    // analyzer(),
    vue(),
    copyVueFilesPlugin(),
    // @ts-ignore
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
    // @ts-ignore
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        ash: FileSystemIconLoader('./src/assets/icons', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
    }),
    // @ts-ignore
    dts({
      include: ['lib', './auto-imports.d.ts'],
      tsconfigPath: 'tsconfig.build.json',
      clearPureImport: true,
    }),
    // libInjectCss(),
  ],
  build: {
    cssCodeSplit: true,
    emptyOutDir: true,
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      external: [
        'vue',
        'tailwindcss',
        'vite',
        'quill'
      ],
      output: {
        assetFileNames: 'assets/[name][extname]',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
