import { exists, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileLogger, logger } from '@bogeychan/elysia-logger'
import { cors } from '@elysiajs/cors'
import { stream, log } from '@root/core/module/plugin/plugin.logger'
import { pluginTrace } from '@root/core/module/plugin/plugin.trace'
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
  // TODO: Check after next bun update. Logger crash app (Segmentation fault at address 0x38)
  .use(logger({ stream }))
  .use(fileLogger({ file: `${logPath}/app.log` }))
  .use(ip({ checkHeaders: ['X-Forwarded-For', 'X-Real-IP'] }))
  .use(rateLimit())
  .use(pluginTrace(log))
