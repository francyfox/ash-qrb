import { db } from '@/core/db'
import { qrbInsertSchema, qrbSchema } from '@/schema/qrb.ts'
import type { ElysiaApp } from '@/server.ts'
import { t } from 'elysia'
import QRCode from 'qrcode'

export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ body, error }) => {
      const { qrb } = body

      await QRCode.toDataURL()
      await db.insert(qrbSchema).values(qrb)
    },
    {
      body: t.Object({
        qrb: qrbInsertSchema,
      }),
    },
  )
