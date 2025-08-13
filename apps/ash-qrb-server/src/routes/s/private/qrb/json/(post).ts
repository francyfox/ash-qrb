import { config } from '@/config.ts'
import { PROJECT_DIR, PUBLIC_DIR } from '@/consts.ts'
import { errorSchema } from '@/core/services/response-format.ts'
import type { ElysiaApp } from '@/server.ts'
import { getFilenameFromURL, getFirstChunkOfFile } from '@/utils/file.ts'
import { t } from 'elysia'
import { semver } from 'bun'
import { join } from 'node:path'

const VERSION_RANGE = `1.0.0 - ${config.APP_VERSION}`

export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ body, set }) => {
      const { file } = body

      const publicFilePath = join(
        PUBLIC_DIR,
        file.replace(`${config.API_URL}/assets`, './'),
      )

      let version = ''
      const chunkContent = await getFirstChunkOfFile(publicFilePath, 20)

      const match = chunkContent.match('"version"\\s*:\\s*"(.*?)"')

      if (match && match?.length > 1) version = match[1] || ''
      const isVersionCorrect = semver.satisfies(version, VERSION_RANGE)

      if (!isVersionCorrect) {
        set.status = 422
        throw new Error(
          `Version should be correct. Expecting range ${VERSION_RANGE}`,
        )
      }

      const worker = new Worker(
        join(PROJECT_DIR, './src/modules/queue/queue.worker.ts'),
      )

      worker.postMessage({
        file: publicFilePath.replace(PROJECT_DIR, ''),
        filename: getFilenameFromURL(publicFilePath),
      })

      worker.onmessage = (e) => {
        console.log(e.data)
      }

      worker.onerror = (e) => {
        console.log(e)
      }
    },
    {
      detail: {
        tags: ['App', 'Qrb', 'Queue'],
      },
      body: t.Object({
        file: t.String(),
      }),
      response: {
        200: t.Any(),
        422: errorSchema,
        500: errorSchema,
      },
    },
  )
