import { swagger } from '@elysiajs/swagger'
import { CrudApi } from '@root/core/module/crud/crud.generate'
import { openapiGenerate } from '@root/core/module/openapi/openapi.generate'
import { log } from '@root/core/module/plugin/plugin.logger'
import { AppPlugins } from '@root/core/plugins'
import { env } from '@root/env'
import { companiesSchema } from '@root/module/companies/companies.schema'
import { db } from '@root/module/db/db'
import { paymentsSchema } from '@root/module/payments/payments.schema'
import { securityGroup } from '@root/module/security/security.group'
import { usersSchema } from '@root/module/users/users.schema'
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
  .use(
    swagger({
      documentation: {
        info: {
          title: 'ASH-QRB Documentation',
          version: '1.0.0',
        },
        tags: [
          { name: 'App', description: 'General endpoints' },
          { name: 'users', description: 'Users endpoints' },
          { name: 'payments', description: 'Payments endpoints' },
          { name: 'companies', description: 'Companies endpoints' },
          { name: 'auth', description: 'Authentication endpoints' },
        ],
        components: {},
      },
      scalarConfig: {},
    }),
  )
  .use(crudRoutes)
  .use(securityRoutes)
  .get('/health', () => 'ok')

switch (env.RUNTIME) {
  case 'bun':
    app.listen({ port: 3000 })

    if (globalThis.count === 0) {
      log.info(
        `Swagger is active at: http://${app.server?.hostname}:${app.server?.port}/api/swagger`,
      )
      globalThis.count++
    }
    // await openapiGenerate()
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
