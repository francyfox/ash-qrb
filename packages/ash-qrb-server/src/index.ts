import plugins from '@root/core/plugins'
import { env } from '@root/env'
import { Elysia } from 'elysia'
const app = new Elysia()

for (const plugin of plugins) {
  // @ts-ignore
  app.use(plugin)
}

app.get('/health', () => 'ok')

switch (env.RUNTIME) {
  case 'bun':
    app.listen({ port: 3000 })
    console.log(
      `Swagger is active at: http://${app.server?.hostname}:${app.server?.port}/swagger`,
    )
    break
  case 'edge':
    console.log('Elysia is running at EDGE')
}

export default async (req: Request) => {
  return app.handle(req)
}

export type App = typeof app
