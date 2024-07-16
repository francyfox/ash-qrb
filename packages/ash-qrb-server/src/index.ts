import { swagger } from '@elysiajs/swagger'
import { CrudApi } from '@root/core/module/crud/crud.generate'
import { log } from '@root/core/module/plugin/plugin.logger'
import { AppPlugins } from '@root/core/plugins'
import { env } from '@root/env'
import { companiesSchema } from '@root/module/companies/companies.schema'
import { db } from '@root/module/db/db'
import { paymentsSchema } from '@root/module/payments/payments.schema'
import { securityGroup } from '@root/module/security/security.group'
import SwaggerConfig from '@root/module/swagger/swagger.config'
import { usersSchema } from '@root/module/users/users.schema'
import { $ } from 'bun'
import { Elysia } from 'elysia'

declare global {
  var count: number
}

globalThis.count ??= 0

const startTime = Bun.nanoseconds()
export const API_PREFIX = '/api'
const crud = new CrudApi(db, [
  { schema: companiesSchema, security: true },
  { schema: paymentsSchema, security: true },
  { schema: usersSchema, exclude: ['add'] },
])

const crudRoutes = await crud.generate({ prefix: API_PREFIX })
const securityRoutes = securityGroup({ prefix: API_PREFIX })

const app = new Elysia({ prefix: '/api' })
  .use(AppPlugins)
  // @ts-ignore
  .use(swagger(SwaggerConfig))
  .use(crudRoutes)
  .use(securityRoutes)
  .get('/health', () => 'ok', {
    detail: {
      responses: {
        '200': {
          $ref: '#/components/schemas/Health',
        },
      },
    },
  })

switch (env.RUNTIME) {
  case 'bun':
    app.listen({ port: 3000 })

    if (globalThis.count === 0) {
      log.info(
        `Swagger is active at: http://${app.server?.hostname}:${app.server?.port}/api/swagger`,
      )
      globalThis.count++
    }

    // await $`bun ../openapi-dts/src/module/openapi/openapi.cli.ts`

    console.log(
      `Updated with time ${(Bun.nanoseconds() - startTime) * 0.000001}ms`,
    )
    break
  case 'edge':
    log.info('Elysia is running at EDGE')
}

export type App = typeof app
export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle
