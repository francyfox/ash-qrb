import { config } from '@/config.ts'
import { PROJECT_DIR } from '@/consts.ts'
import { createElysiaIpx } from '@/core/services/ipx.ts'
import { elysiaRedis } from '@/core/services/redis.ts'
import { swaggerOptions } from '@/core/services/swagger.ts'
import { betterAuthPlugin } from '@/utils/auth/auth.ts'
import { cors } from '@elysiajs/cors'
import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { errorHandler } from '@gtramontina.com/elysia-error-handler'
import { Logestic } from 'logestic'
import { Elysia } from 'elysia'
import { autoload } from 'elysia-autoload'
import { createIPX, ipxFSStorage, ipxHttpStorage } from 'ipx'
import { join } from 'node:path'
import { staticPlugin } from '@elysiajs/static'
import { opentelemetry } from '@elysiajs/opentelemetry'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'

const ipx = createIPX({
  storage: ipxFSStorage({ dir: join(PROJECT_DIR, './public') }),
  httpStorage: ipxHttpStorage({ domains: ['picsum.photos'] }),
})

export const app = new Elysia()
  .use(
    // @ts-ignore
    opentelemetry({
      spanProcessors: [
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: 'https://api.axiom.co/v1/traces',
            headers: {
              Authorization: `Bearer ${config.AXIOM_TOKEN}`,
              // @ts-ignore
              'X-Axiom-Dataset': config.AXIOM_DATASET,
            },
          }),
        ),
      ],
    }),
  )
  // @ts-ignore
  .use(errorHandler())
  // @ts-ignore
  .use(Logestic.preset(config.NODE_ENV === 'development' ? 'fancy' : 'common'))
  .use(serverTiming() as any)
  .use(elysiaRedis)
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
    }) as any,
  )
  .use(
    (await autoload({
      types: {
        output: './routes.ts',
        typeName: 'Routes',
      },
    })) as any,
  )
  .use(
    // @ts-ignore
    staticPlugin({
      prefix: '/assets',
    }),
  )
  .use(createElysiaIpx(ipx))
  .use(swagger(swaggerOptions as any) as any)

export type ElysiaApp = typeof app
export const GET = app.handle
export const POST = app.handle
export const PATCH = app.handle
export const PUT = app.handle
export const DELETE = app.handle
