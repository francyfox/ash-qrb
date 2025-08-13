import { QueueService } from '@/modules/queue/queue.service.ts'
import type { ElysiaApp } from '@/server.ts'
import type { RedisClient } from 'bun'

export default (app: ElysiaApp) =>
  app.get(
    '',
    async ({ redis }: { redis: RedisClient }) => {
      const service = new QueueService(redis)
      const list = await service.getAll(false, ['status', 'value'])

      return list
    },
    {
      detail: {
        tags: ['App', 'Queue'],
      },
    },
  )
