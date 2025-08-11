import { config } from '@/config.ts'
import { PROJECT_DIR, PUBLIC_DIR } from '@/consts.ts'
import { errorSchema } from '@/core/services/response-format.ts'
import { QueueService } from '@/modules/queue/queue.service.ts'
import type { ElysiaApp } from '@/server.ts'
import { isUrl } from '@/utils/url.ts'
import { type Context, t } from 'elysia'
import { type RedisClient, semver } from 'bun'
import { Packr } from 'msgpackr'
import { join } from 'node:path'

const VERSION_RANGE = `1.0.0 - ${config.APP_VERSION}`

interface RedisContext extends Context {
  redis: RedisClient
}
export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ body, set, redis }: RedisContext) => {
      const packr = new Packr()

      const { file } = body as any

      const publicFilePath = join(
        PUBLIC_DIR,
        file.replace(`${config.API_URL}/assets`, './'),
      )

      console.log(file)

      // const isVersionCorrect = semver.satisfies(json?.version, VERSION_RANGE)
      //
      // if (!isVersionCorrect) {
      //   set.status = 422
      //   throw new Error(
      //     `Version should be correct. Expecting range ${VERSION_RANGE}`,
      //   )
      // }

      // if (Array.isArray(json.items)) {
      //   const service = new QueueService(redis)
      //
      //   service.worker.postMessage(publicFilePath)
      //
      //   service.worker.onmessage = (e) => {
      //     console.log(e.data)
      //   }
      //
      //   service.worker.onerror = (e) => {
      //     console.log(e)
      //   }
      // }
    },
    {
      detail: {
        tags: ['App', 'Qrb', 'Queue'],
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
