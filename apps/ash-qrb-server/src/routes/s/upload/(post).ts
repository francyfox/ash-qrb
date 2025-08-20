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
      let [name, extension] = body.file.name.split('.')

      if (extension === 'json') extension = 'json.gz'

      const filename = generateId()
      const checksum = await calculateFileChecksum(file)
      // Checking for file duplicates

      const [existFile] = await redis.hmget(`upload:${checksum}`, ['value'])
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

      await redis.hmset(`upload:${checksum}`, [
        'checksum',
        checksum || '',
        'value',
        JSON.stringify([dir, filename, extension]),
      ])

      await mkdir(`${PUBLIC_DIR}/${dir}`, { recursive: true })

      const content =
        dir === 'json/' ? Bun.gzipSync(await file.slice(3).arrayBuffer()) : file

      await Bun.write(`${PUBLIC_DIR}/${dir}${filename}.${extension}`, content)

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
