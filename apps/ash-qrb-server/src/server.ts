import { config } from '@/config.ts'
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'
import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { errorHandler } from '@gtramontina.com/elysia-error-handler'
import { logger } from '@tqman/nice-logger'
import { Elysia } from 'elysia'
import { autoload } from 'elysia-autoload'
import { oauth2 } from 'elysia-oauth2'

export const app = new Elysia()
  .use(errorHandler())
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
  .use(
    oauth2({
      WorkOS: [
        config.WORKOS_CLIENT_ID,
        config.WORKOS_API_KEY,
        'https://example.com/auth/google/callback',
      ],
    }),
  )
  .use(cors())
  .use(jwt({ secret: config.JWT_SECRET }))
  .use(serverTiming())
  .use(autoload())

export type ElysiaApp = typeof app
export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle
