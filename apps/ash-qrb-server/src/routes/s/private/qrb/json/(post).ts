import { config } from '@/config.ts'
import { errorSchema } from '@/core/services/response-format.ts'
import { QueueService } from '@/modules/queue/queue.service.ts'
import { qrbSchema } from '@/schema/qrb.ts'
import type { ElysiaApp } from '@/server.ts'
import { type Context, t } from 'elysia'
import { type RedisClient, semver } from 'bun'
import { db } from '@/core/db'

const VERSION_RANGE = `1.0.0 - ${config.APP_VERSION}`

interface RedisContext extends Context {
  redis: RedisClient
}
export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ body, set, redis }: RedisContext) => {
      const { file } = body as any
      const json = await Bun.file(file).json()
      const isVersionCorrect = semver.satisfies(json?.version, VERSION_RANGE)

      if (!isVersionCorrect) {
        set.status = 422
        throw new Error(
          `Version should be correct. Expecting range ${VERSION_RANGE}`,
        )
      }

      if (Array.isArray(json.items)) {
        const service = new QueueService(redis)
        service.worker = new Worker('./queue.worker.ts')

        service.worker.postMessage(json.items)
      }
    },
    {
      detail: {
        tags: ['App', 'Qrb'],
      },
      body: t.Object({
        file: t.String(),
      }),
      response: {
        200: t.Any(),
        422: errorSchema,
        500: errorSchema,
      },
    },
  )
