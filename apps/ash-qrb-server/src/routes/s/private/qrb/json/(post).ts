import { config } from '@/config.ts'
import { errorSchema } from '@/core/services/response-format.ts'
import { qrbSchema } from '@/schema/qrb.ts'
import type { ElysiaApp } from '@/server.ts'
import { t } from 'elysia'
import { semver } from 'bun'
import { db } from '@/core/db'

const VERSION_RANGE = `1.0.0 - ${config.APP_VERSION}`

export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ body, error, set }) => {
      const { file } = body
      const json = await Bun.file(file).json()
      const isVersionCorrect = semver.satisfies(json?.version, VERSION_RANGE)

      if (!isVersionCorrect) {
        set.status = 422
        throw new Error(
          `Version should be correct. Expecting range ${VERSION_RANGE}`,
        )
      }

      if (Array.isArray(json.items)) {
        // redis
        await db.insert(qrbSchema).values(json.items)
      }
    },
    {
      detail: {
        tags: ['App', 'Qrb'],
      },
      body: t.Object({
        file: t.File({ format: 'application/json' }),
      }),
      response: {
        200: t.Any(),
        422: errorSchema,
        500: errorSchema,
      },
    },
  )
