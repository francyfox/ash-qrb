import { config } from '@/config.ts'
import { db } from '@/core/db'
import { errorSchema } from '@/core/services/response-format.ts'
import { qrbSchema, qrbSelectSchema } from '@/schema/qrb.ts'
import type { ElysiaApp } from '@/server.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.get(
    '',
    async () => {
      const items = await db.select().from(qrbSchema)

      return {
        $schema: `${config.API_URL}/swagger/json#paths./s/private/qrb/json.get.responses.content.application/json.schema`,
        version: config.APP_VERSION,
        items,
      }
    },
    {
      detail: {
        tags: ['App', 'Qrb'],
      },
      response: {
        200: t.Object({
          $schema: t.Any(),
          version: t.String(),
          items: t.Array(t.Partial(qrbSelectSchema)),
        }),
        500: errorSchema,
      },
    },
  )
