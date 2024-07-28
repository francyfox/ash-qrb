import { exists, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileLogger, logger } from '@bogeychan/elysia-logger'
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'
import { stream, log } from '@root/core/module/plugin/plugin.logger'
import { pluginTrace } from '@root/core/module/plugin/plugin.trace'
import { env } from '@root/env'
import { Elysia } from 'elysia'
// @ts-ignore
import { ip } from 'elysia-ip'
import { rateLimit } from 'elysia-rate-limit'

const logPath = join(process.cwd(), 'log')

if (!(await exists(logPath))) {
  await mkdir(logPath)
}

export const AppPlugins = new Elysia()
  .use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  .use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET_KEY,
    }),
  )
  .use(logger({ stream }))
  .use(fileLogger({ file: `${logPath}/app.log` }))
  .use(ip({ checkHeaders: ['X-Forwarded-For', 'X-Real-IP'] }))
  .use(rateLimit())
  .use(pluginTrace(log))
