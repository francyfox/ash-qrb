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

      if (!id) error('Unprocessable Content')
      const path = `${config.CLIENT_APP_URL}/qrb/${id}`
      const qrCode = await QRCode.toDataURL(path)
      const qrCodeTerminal = await QRCode.toString(path, { type: 'terminal' })
      await db
        .update(qrbSchema)
        .set({
          qrCode: qrCode,
          qrCodeTerminal: btoa(qrCodeTerminal),
        })
        .where(eq(qrbSchema.id, id))
    },
    {
      detail: { tags: ['App', 'Qrb'] },
      body: t.Object({
        qrb: qrbInsertSchema,
      }),
    },
  )
