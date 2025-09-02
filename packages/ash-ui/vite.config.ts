import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import ui from '@nuxt/ui/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import { copyVueFilesPlugin } from './plugin.ts'
// import { analyzer } from 'vite-bundle-analyzer'
// import { libInjectCss } from 'vite-plugin-lib-inject-css'

const __dirname = dirname(fileURLToPath(import.meta.url))

console.log(resolve(__dirname, 'src/lib.ts'))

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
      tsconfigPath: 'tsconfig.build.json',
      insertTypesEntry: true,
      clearPureImport: true,
      rollupTypes: true,
      copyDtsFiles: true
    }),
    // libInjectCss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib.ts'),
      name: 'AshUI',
      fileName: 'index',
      formats: ['es']
    },
    cssCodeSplit: true,
    emptyOutDir: true,
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      external: [
        'vue',
        '@nuxt/ui',
        '@vueuse/core',
        'ash-i18n',
        'tailwindcss',
        'vite',
        'quill'
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
