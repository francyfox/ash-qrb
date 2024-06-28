import { exists, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileLogger, logger } from '@bogeychan/elysia-logger'
import { swagger } from '@elysiajs/swagger'
import { CrudApi } from '@root/core/module/crud/crud.generate'
import { stream, log } from '@root/core/module/plugin/plugin.logger'
import { pluginTrace } from '@root/core/module/plugin/plugin.trace'
import { companiesSchema } from '@root/module/companies/companies.schema'
import { db } from '@root/module/db/db'
import { paymentsSchema } from '@root/module/payments/payments.schema'
import { securityController } from '@root/module/security/security.controller'
import { usersSchema } from '@root/module/users/users.schema'
// @ts-ignore
import { ip } from 'elysia-ip'
import { rateLimit } from 'elysia-rate-limit'

const logPath = join(process.cwd(), 'log')

if (!(await exists(logPath))) {
  await mkdir(logPath)
}

const crud = new CrudApi(db, [
  { schema: companiesSchema, security: true },
  { schema: paymentsSchema, security: true },
  { schema: usersSchema, exclude: ['add'] },
])
export default [
  logger({ stream }),
  fileLogger({ file: `${logPath}/app.log` }),
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
  ip({ checkHeaders: ['X-Forwarded-For', 'X-Real-IP'] }),
  rateLimit(),
  pluginTrace(log),
  securityController(),
  crud.generate(),
]
