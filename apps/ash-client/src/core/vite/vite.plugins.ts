import path from 'node:path'
import process from 'node:process'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import type { UserConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'
import { ClientSideLayout } from 'vite-plugin-vue-layouts'

export const plugins: UserConfig['plugins'] = [
  vue(),
  Pages({
    extensions: ['vue'],
    routeStyle: 'nuxt',
  }),
  AutoImport({
    imports: {
      '@unhead/vue': ['unheadVueComposablesImports'],
    },
    include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    dirs: ['src/composables', 'src/stores'],
  }),
  VueI18n({
    fullInstall: false,
    compositionOnly: true,
    include: [path.resolve(process.cwd(), 'locales/**')],
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
