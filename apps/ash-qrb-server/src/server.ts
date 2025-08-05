import { config } from '@/config.ts'
import { elysiaRedis } from '@/core/services/redis.ts'
import { auth, betterAuthPlugin } from '@/utils/auth/auth.ts'
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'
import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { errorHandler } from '@gtramontina.com/elysia-error-handler'
import { Logestic } from 'logestic'
import { Elysia } from 'elysia'
import { autoload } from 'elysia-autoload'

const { info, openapi, ...authSwagger } = await auth.api.generateOpenAPISchema()

export const app = new Elysia()
  // @ts-ignore
  .use(errorHandler())
  // @ts-ignore
  .use(Logestic.preset(config.NODE_ENV === 'development' ? 'fancy' : 'common'))
  .use(
    swagger({
      scalarConfig: {
        servers: [
          {
            url: config.API_URL,
          },
        ],
      },
      documentation: {
        info: {
          title: 'ASH-QRB Documentation',
          version: '1.0.0',
        },
        tags: [
          {
            name: 'App',
            description: 'General endpoits',
          },
        ],
        ...authSwagger,
      },
    }),
  )
  .use(elysiaRedis)
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
  .use(betterAuthPlugin)
  .use(
    cors({
      origin: [
        config.CLIENT_APP_URL,
        'http://localhost',
        'https://localhost',
        'https://qrb.shalotts.site',
        '*',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )

export type ElysiaApp = typeof app
export const GET = app.handle
export const POST = app.handle
export const PATCH = app.handle
export const PUT = app.handle
export const DELETE = app.handle
