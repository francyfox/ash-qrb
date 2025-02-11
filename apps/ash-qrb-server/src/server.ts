import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'
import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { logger } from '@tqman/nice-logger'
import { Elysia } from 'elysia'
import { autoload } from 'elysia-autoload'
import { oauth2 } from 'elysia-oauth2'
import { config } from './config.ts'

export const app = new Elysia()
  .use(logger())
  .use(swagger())
  .use(oauth2({}))
  .use(cors())
  .use(jwt({ secret: config.JWT_SECRET }))
  .use(serverTiming())
  .use(autoload())

export type ElysiaApp = typeof app
