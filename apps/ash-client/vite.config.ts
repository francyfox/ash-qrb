import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import 'vite-ssg'
import generateSitemap from 'vite-ssg-sitemap'
import { plugins } from './src/core/vite/vite.plugins'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '~root/': `${path.resolve(__dirname, '')}/`,
    },
  },
  plugins,
  ssgOptions: {
    script: 'async',
    dirStyle: process.env.NESTED_PAGES === 'true' ? 'nested' : 'flat',
    formatting: 'minify',
    beastiesOptions: {
      reduceInlineStyles: false,
      preload: 'media',
    },
    onFinished() {
      generateSitemap()
    },
  },
})
