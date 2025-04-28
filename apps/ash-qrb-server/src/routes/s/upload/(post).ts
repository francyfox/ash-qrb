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
      const uploadedFile = await mediaStore.uploader.upload(filename)
      await file.delete()

      return uploadedFile
    },
    {
      body: t.Partial(
        t.Object({
          file: t.File({ format: 'image/*' }),
        }),
      ),
      ...validationCollectionItem(
        t.Object({
          public_id: t.String(),
          version: t.Number(),
          signature: t.String(),
          width: t.Number(),
          height: t.Number(),
          format: t.String(),
          resource_type: t.Union([
            t.Literal('image'),
            t.Literal('video'),
            t.Literal('raw'),
            t.Literal('auto'),
          ]),
          created_at: t.String(),
          tags: t.Array(t.String()),
          pages: t.Number(),
          bytes: t.Number(),
          type: t.String(),
          etag: t.String(),
          placeholder: t.Boolean(),
          url: t.String(),
          secure_url: t.String(),
          access_mode: t.String(),
          original_filename: t.String(),
          moderation: t.Array(t.String()),
          access_control: t.Array(t.String()),
          context: t.Unknown(),
          metadata: t.Unknown(),
          colors: t.Partial(t.Unknown()),
        }),
      ),
    },
  )
