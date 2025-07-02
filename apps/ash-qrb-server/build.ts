import { Glob } from 'bun'
import { rm } from 'node:fs/promises'

async function getRoutes() {
  const glob = new Glob('./src/routes/**/*.ts')
  const routes = await Array.fromAsync(glob.scan())

  return routes
}
;(async () => {
  await rm('./dist', { recursive: true, force: true })
  await Bun.build({
    target: 'bun',
    root: './src',
    entrypoints: ['./src/index.ts', ...(await getRoutes())],
    outdir: './dist',
    splitting: true,
    sourcemap: 'linked',
    env: 'inline',
    minify: {
      whitespace: true,
      syntax: true,
    },
  })
})()
