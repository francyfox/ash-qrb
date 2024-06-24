import type { Config } from '@netlify/functions'
import { env } from '@root/env'
import { Elysia } from 'elysia'

const app = new Elysia().get('/', () => ';) Hello Elysia')

switch (env.RUNTIME) {
  case 'bun':
    app.listen({ port: 3000 })
    console.log(
      `;) Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
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
