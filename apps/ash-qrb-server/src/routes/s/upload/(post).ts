import os from 'node:os'
import { validationCollectionItem } from '@/core/services/response-format.ts'
import type { ElysiaApp } from '@/server.ts'
import { storage } from '@/utils/cloudinary.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.post(
    '/',
    async ({ body, error }) => {
      const mediaStore = storage()
      const [name, extension] = body.file.name.split('.')

      const filename = `${os.tmpdir()}/${Bun.hash(name)}.${extension}`
      const file = Bun.file(filename)

      await file.write(body.file)

      const uploadedFile = await mediaStore.uploader.upload(filename, {
        upload_preset: 'ml_default',
        folder: 'qrb-uploads',
      })

      await file.delete()

      return {
        item: uploadedFile,
      }
    },
    {
      body: t.Partial(
        t.Object({
          file: t.File({
            format: 'image/*,application/json,application/octet-stream',
          }),
        }),
      ),
      ...validationCollectionItem(
        t.Object({
          asset_id: t.String(),
          public_id: t.String(),
          version: t.Number(),
          signature: t.String(),
          width: t.Number(),
          height: t.Number(),
          format: t.String(),
          created_at: t.String(),
          tags: t.Array(t.String()),
          bytes: t.Number(),
          type: t.String(),
          etag: t.String(),
          placeholder: t.Boolean(),
          url: t.String(),
          secure_url: t.String(),
          original_filename: t.String(),
        }),
      ),
    },
  )
