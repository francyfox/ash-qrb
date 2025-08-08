import { config } from '@/config.ts'
import { PUBLIC_DIR } from '@/consts.ts'
import { validationCollectionItem } from '@/core/services/response-format.ts'
import type { ElysiaApp } from '@/server.ts'
import { mkdir } from 'node:fs/promises'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.post(
    '/',
    async ({ body, error }) => {
      const { dir, file } = body
      const [name, extension] = body.file.name.split('.')

      const filename = Bun.hash(name)

      await mkdir(`${PUBLIC_DIR}/${dir}`, { recursive: true })
      await Bun.write(`${PUBLIC_DIR}/${dir}${filename}.${extension}`, file)

      console.log('test')
      return {
        item: {
          filename: filename.toString(),
          url: `${config.API_URL}/ipx/${dir}${filename}.${extension}`,
          originalUrl: `${config.API_URL}/assets/${dir}${filename}.${extension}`,
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
