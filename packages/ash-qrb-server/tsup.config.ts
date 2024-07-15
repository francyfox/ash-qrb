import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    // index: './src/index.ts',
    cliOpenApi: './src/core/module/openapi/openapi.cli.ts',
  },
  outDir: './dist',
  format: ['esm'],
  target: 'node18',
  noExternal: [/(.*)/],
  minify: false,
  clean: true,
})
