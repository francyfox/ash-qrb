import { db } from '@/core/db'
import { qrbSchema } from '@/schema/qrb.ts'
import type { ElysiaApp } from '@/server.ts'
import { inArray } from 'drizzle-orm/sql/expressions/conditions'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.delete(
    '',
    async ({ body }) => {
      const { ids } = body

      await db.delete(qrbSchema).where(inArray(qrbSchema.id, ids))
    },
    {
      detail: { tags: ['App'] },
      body: t.Object({
        ids: t.Array(t.String()),
      }),
    },
  )
