import { db } from '@/core/db'
import { qrbInsertSchema, qrbSchema } from '@/schema/qrb.ts'
import type { ElysiaApp } from '@/server.ts'
import { inArray } from 'drizzle-orm/sql/expressions/conditions'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.patch(
    '',
    async ({ body }) => {
      const { ids, fields } = body

      await db.update(qrbSchema).set(fields).where(inArray(qrbSchema.id, ids))
    },
    {
      detail: { tags: ['App', 'Qrb'] },
      body: t.Object({
        ids: t.Array(t.String()),
        fields: t.Partial(qrbInsertSchema),
      }),
    },
  )
