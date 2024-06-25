import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
  format: ['esm'],
  target: 'node18',
  noExternal: [/(.*)/],
  minify: true,
  clean: true,
})
