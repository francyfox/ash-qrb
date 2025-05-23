import { config } from '@/config.ts'
import { db } from '@/core/db'
import { qrbInsertSchema, qrbSchema } from '@/schema/qrb.ts'
import type { ElysiaApp } from '@/server.ts'
import { eq } from 'drizzle-orm/sql/expressions/conditions'
import { t } from 'elysia'
import QRCode from 'qrcode'

export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ body, error }) => {
      const { qrb } = body

      const [item] = await db.insert(qrbSchema).values(qrb).returning()
      const id = item?.id

      if (!id) error('Could not set qr code without id')
      const path = `${config.CLIENT_APP_URL}/qrb/${id}`
      const qr = await QRCode.toDataURL(path)
      await db.update(qrbSchema).set({ qrCode: qr }).where(eq(qrbSchema.id, id))
    },
    {
      body: t.Object({
        qrb: qrbInsertSchema,
      }),
    },
  )
