import { config } from '@/config.ts'
import { PUBLIC_DIR } from '@/consts.ts'
import { validationCollectionItem } from '@/core/services/response-format.ts'
import type { ElysiaApp } from '@/server.ts'
import { calculateFileChecksum } from '@/utils/generate.ts'
import { generateId } from '@/utils/generate.ts'
import type { RedisClient } from 'bun'
import { mkdir } from 'node:fs/promises'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.post(
    '/',
    async ({ redis, body }: { redis: RedisClient; body: any }) => {
      const { dir, file } = body
      const [name, extension] = body.file.name.split('.')

      const filename = generateId()
      const checksum = await calculateFileChecksum(file)
      // Checking for file duplicates
      const existFile = await redis.get(`upload:${filename}`)

      if (existFile) {
        const [dir, filename, extension] = JSON.parse(existFile)
        return {
          item: {
            filename: filename.toString(),
            url: `${config.API_URL}/ipx/${dir}${filename}.${extension}`,
            originalUrl: `${config.API_URL}/assets/${dir}${filename}.${extension}`,
            extension,
          },
        }
      }

      await redis.set(
        `upload:${checksum || ''}`,
        JSON.stringify([dir, filename, extension]),
      )

      await mkdir(`${PUBLIC_DIR}/${dir}`, { recursive: true })
      await Bun.write(
        `${PUBLIC_DIR}/${dir}${filename}.${extension}`,
        file.slice(3),
      )

      return {
        item: {
          filename: filename,
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
