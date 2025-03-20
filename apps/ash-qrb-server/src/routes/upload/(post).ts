import type { ElysiaApp } from '@/server.ts'
import { storage } from '@/utils/cloudinary.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.post(
    '/',
    async ({ body, error }) => {
      const { file, multipleFiles } = body

      if (multipleFiles) error('We dont support multiple files now')
      if (!file) error('No file uploaded')

      const mediaStore = storage()
      const uploadedFile = await mediaStore.uploader.upload(file)

      return uploadedFile
    },
    {
      body: t.Partial(
        t.Object({
          file: t.File({ format: 'image/*' }),
          multipleFiles: t.Files(),
        }),
      ),
    },
  )
