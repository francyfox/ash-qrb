import { CrudApi } from '@root/core/module/crud/crud.generate'
import plugins from '@root/core/plugins'
import { env } from '@root/env'
import { db } from '@root/module/db/db'
import { usersSchema } from '@root/module/users/users.schema'
import { Elysia } from 'elysia'
const app = new Elysia()

for (const plugin of plugins) {
  // @ts-ignore
  app.use(plugin)
}

app
  .get('/', () => {
    return ';) Hello Elysia'
  })
  .get('/health', () => 'ok')

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
