import type { ElysiaApp } from '@/server.ts'
import { db } from '@/core/db'
import { qrbInsertSchema, qrbSchema } from '@/schema/qrb.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ body, error }) => {
      const { qrb } = body
      await db.insert(qrbSchema).values(qrb)
    },
    {
      body: t.Object({
        qrb: qrbInsertSchema,
      }),
    },
  )
