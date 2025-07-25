// biome-ignore lint: disable
import type { ElysiaApp } from '@/server.ts'
import { db } from '@/core/db'
import { eq } from 'drizzle-orm/sql/expressions/conditions'
import { qrbInsertSchema, qrbSchema } from '@/schema/qrb.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.patch(
    '',
    async ({ body, error, params }) => {
      const { id } = params
      await db.update(qrbSchema).set(body.qrb).where(eq(qrbSchema.id, id))
    },
    {
      detail: { tags: ['App', 'Qrb'] },
      body: t.Object({
        qrb: qrbInsertSchema,
      }),
    },
  )
