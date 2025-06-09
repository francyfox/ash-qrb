import { config } from '@/config.ts'
import { betterAuthPlugin } from '@/utils/auth.ts'
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'
import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { errorHandler } from '@gtramontina.com/elysia-error-handler'
import { logger } from '@tqman/nice-logger'
import { Elysia } from 'elysia'
import { autoload } from 'elysia-autoload'

export const app = new Elysia()
  // @ts-ignore
  .use(errorHandler())
  // @ts-ignore
  .use(
    logger({
      mode: 'live',
      withTimestamp: true,
    }),
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: 'ASH-QRB Documentation',
          version: '1.0.0',
        },
      },
    }),
  )
  .use(jwt({ secret: config.JWT_SECRET }))
  .use(serverTiming())
  .use(
    await autoload({
      types: {
        output: './routes.ts',
        typeName: 'Routes',
      },
    }),
  )
  .use(
    cors({
      origin: [config.CLIENT_APP_URL, config.API_URL],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  .use(betterAuthPlugin)

export type ElysiaApp = typeof app
export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle
