import { config } from '@/config.ts'
import { errorSchema } from '@/core/services/response-format.ts'
import { QueueService } from '@/modules/queue/queue.service.ts'
import type { ElysiaApp } from '@/server.ts'
import { isUrl } from '@/utils/url.ts'
import { type Context, t } from 'elysia'
import { type RedisClient, semver } from 'bun'
import { Packr } from 'msgpackr'

const VERSION_RANGE = `1.0.0 - ${config.APP_VERSION}`

interface RedisContext extends Context {
  redis: RedisClient
}
export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ body, set, redis }: RedisContext) => {
      const packr = new Packr()

      const { file, type } = body as any
      let json: any

      console.log(file)
      console.log(packr.unpack(file))

      // switch (type) {
      //   case 'mp:content':
      //     json = packr.unpack(Buffer.from(file))
      //     break
      //   case 'mp': {
      //     const buffer = await fetch(file).then(
      //       (response) => response.arrayBuffer,
      //     )
      //     json = packr.unpack(buffer)
      //     break
      //   }
      //   case 'json': {
      //     json = await fetch(file).then((res) => res.json())
      //     break
      //   }
      // }
      //
      // const isVersionCorrect = semver.satisfies(json?.version, VERSION_RANGE)
      //
      // if (!isVersionCorrect) {
      //   set.status = 422
      //   throw new Error(
      //     `Version should be correct. Expecting range ${VERSION_RANGE}`,
      //   )
      // }
      //
      // console.log(json?.version)
      //
      // if (Array.isArray(json.items)) {
      //   const service = new QueueService(redis)
      //   service.worker = new Worker('./queue.worker.ts')
      //
      //   service.worker.postMessage(json.items)
      // }
    },
    {
      detail: {
        tags: ['App', 'Qrb', 'Queue'],
      },
      body: t.Object({
        type: t.Union(
          [t.Literal('json'), t.Literal('mpk'), t.Literal('mpk:content')],
          {
            default: 'mpk:content',
            description:
              'JSON/MPK (messagepack) use url from CDN. mp:content use for messagepack (Buffer) converted to string',
          },
        ),
        file: t.String(),
      }),
      response: {
        200: t.Any(),
        422: errorSchema,
        500: errorSchema,
      },
    },
  )
