import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import 'vite-ssg'
import twPostCss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import nested from 'postcss-nested'
import generateSitemap from 'vite-ssg-sitemap'
import { config as __APP_ENV__ } from './config'
import { plugins } from './src/core/vite/vite.plugins'
import { readFileSync } from 'node:fs'

const certsFolder = '../../docker/certs'
console.log(__APP_ENV__.NODE_ENV !== 'production')
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        secure: false,
        changeOrigin: true,
        target: {
          protocol: 'https:',
          host: 'localhost',
          port: 3000,
        }
      }
    },
    port: 4000,
    https: __APP_ENV__.NODE_ENV !== 'production' ? {
      key: readFileSync(path.resolve(`${certsFolder}/private.pem`)),
      cert: readFileSync(path.resolve(`${certsFolder}/cert.pem`)),
      rejectUnauthorized: false,
    } : undefined
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '~root/': `${path.resolve(__dirname, '')}/`,
    },
  },
  define: {
    __APP_ENV__,
  },
  plugins,
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer(), nested, twPostCss],
    },
  },
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
