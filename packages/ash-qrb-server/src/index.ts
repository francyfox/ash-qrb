import type { Config } from '@netlify/functions'
// import plugins from '@root/core/plugins'
import { env } from '@root/env'
import { Elysia } from 'elysia'

const app = new Elysia().get('/', () => ';) Hello Elysia')

// for (const plugin of plugins()) {
//   // @ts-ignore
//   app.use(plugin)
// }

switch (env.RUNTIME) {
  case 'bun':
    app.listen({ port: 3000 })
    console.log(
      `Swagger is active at: ${app.server?.hostname}:${app.server?.port}/swagger`,
    )
    break
  case 'edge':
    console.log('Elysia is running at EDGE')
}

export default async (req: Request) => {
  return app.handle(req)
}

export const config: Config = {
  path: ['/'],
}
