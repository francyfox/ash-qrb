import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
  format: ['esm'],
  target: 'node16',
  platform: 'node',
  noExternal: [/(.*)/],
  minify: true,
  clean: true,
})
