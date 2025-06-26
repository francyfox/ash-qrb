import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { resolve } from 'node:path'

const app = new Elysia()
app.use(
  staticPlugin({
    prefix: '',
    assets: resolve(__dirname, './dist'),
  }),
)

app.get('/', async () => {
  return Bun.file(resolve(__dirname, './dist/index.html'))
})

app.listen(4000, () => {
  console.log(
    `⦮ ⦯ Client is running at http://${app.server?.hostname}:${app.server?.port}`,
  )
})
