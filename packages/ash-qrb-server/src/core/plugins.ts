import { exists, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileLogger, logger } from '@bogeychan/elysia-logger'
import { swagger } from '@elysiajs/swagger'
import { CrudApi } from '@root/core/module/crud/crud.generate'
import { stream, log } from '@root/core/module/plugin/plugin.logger'
import { pluginTrace } from '@root/core/module/plugin/plugin.trace'
import { db } from '@root/module/db/db'
import { usersSchema } from '@root/module/users/users.schema'
// @ts-ignore
import { ip } from 'elysia-ip'
import { rateLimit } from 'elysia-rate-limit'

const logPath = join(process.cwd(), 'log')

if (!(await exists(logPath))) {
  await mkdir(logPath)
}

const crud = new CrudApi(db, [usersSchema])
export default [
  logger({ stream }),
  fileLogger({ file: `${logPath}/app.log` }),
  swagger({
    documentation: {
      info: {
        title: 'ASH-QRB Documentation',
        version: '1.0.0',
      },
      definitions: {
        Todo: {
          test: 'ss',
        },
      },
      tags: [
        { name: 'App', description: 'General endpoints' },
        { name: 'Auth', description: 'Authentication endpoints' },
      ],
      components: {},
    },
  }),
  ip({ checkHeaders: ['X-Forwarded-For', 'X-Real-IP'] }),
  rateLimit(),
  pluginTrace(log),
  crud.generate(),
]
