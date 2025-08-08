import { config } from '@/config.ts'
import { PUBLIC_DIR } from '@/consts.ts'
import { validationCollectionItem } from '@/core/services/response-format.ts'
import type { ElysiaApp } from '@/server.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.post(
    '/',
    async ({ body, error }) => {
      const { dir } = body
      const [name, extension] = body.file.name.split('.')

      const filename = Bun.hash(name)
      const file = Bun.file(`${PUBLIC_DIR}/${dir}${filename}.${extension}`)
      const writer = file.writer()

      writer.write(body.file)

      await writer.flush()

      return {
        item: {
          filename,
          url: `${config.API_URL}/ipx/${filename}.${extension}`,
          originalUrl: `${config.API_URL}/assets/${filename}.${extension}`,
          extension,
        },
      }
    },
    {
      body: t.Partial(
        t.Object({
          dir: t.String({
            default: 'images/',
          }),
          file: t.File({
            format: 'image/*,application/json,application/octet-stream',
          }),
        }),
      ),
      ...validationCollectionItem(
        t.Object({
          filename: t.String(),
          url: t.String(),
          originalUrl: t.String(),
          extension: t.String(),
        }),
      ),
    },
  )
