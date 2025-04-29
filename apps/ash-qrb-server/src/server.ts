import { config } from '@/config.ts'
import { betterAuthView } from '@/utils/auth.ts'
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
  .all('/s/*', (ctx) => ctx.use(cors()))
  .all('/s/private/*', betterAuthView)

export type ElysiaApp = typeof app
export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle
