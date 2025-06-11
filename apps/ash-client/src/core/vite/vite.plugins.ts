import { resolve } from 'node:path'
import process from 'node:process'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import ui from '@nuxt/ui/vite'
import vue from '@vitejs/plugin-vue'
import { ashUIResolver } from 'ash-ui'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import type { UserConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'
import { ClientSideLayout } from 'vite-plugin-vue-layouts'
import tailwindAutoReference from 'vite-plugin-vue-tailwind-auto-reference'

export const plugins: UserConfig['plugins'] = [
  tailwindAutoReference(resolve(process.cwd(), 'src/tw.css')),
  ui({
    colorMode: false,
    autoImport: {
      imports: {
        pinia: ['defineStore'],
        '@unhead/vue': ['unheadVueComposablesImports'],
      },
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ['src/composables', 'src/stores'],
    },
    components: {
      resolvers: [
        ashUIResolver,
        IconsResolver({
          customCollections: ['ash'],
        }),
      ],
    },
    ui: {
      checkbox: {
        defaultVariants: {
          size: 'xl',
          color: 'primary',
          variant: 'list',
          indicator: 'start',
        },
      },
      button: {
        defaultVariants: {
          color: 'primary',
          variant: 'solid',
          size: 'xl',
        },
      },
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
  vue(),
  Pages({
    extensions: ['vue'],
    routeStyle: 'nuxt',
  }),
  VueI18n({
    fullInstall: false,
    compositionOnly: true,
  }),
  VitePWA({
    minify: true,
    // @ts-ignore
    mode: process.env.NODE_ENV || 'development',
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
    manifest: {
      name: 'Vitesse',
      short_name: 'Vitesse',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  }),
  ClientSideLayout(),
]
