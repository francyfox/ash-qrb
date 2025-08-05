import type { ElysiaApp } from '@/server.ts'
import type { RedisClient } from 'bun'

export default (app: ElysiaApp) =>
  app.get(
    '',
    async ({ redis }: { redis: RedisClient }) => {
      const list = await redis
    },
    {
      detail: {
        tags: ['App', 'Queue'],
      },
    },
  )
