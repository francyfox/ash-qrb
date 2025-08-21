import { QUEUE_STATUS } from '@/modules/queue/queue.model.ts'
import { QueueService } from '@/modules/queue/queue.service.ts'
import type { ElysiaApp } from '@/server.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.get(
    '',
    async ({ redis, query }) => {
      const service = new QueueService(redis)
      const items = await service.getAll(false)

      return {
        items,
        count: items.length,
        total: items.length, // TODO
      }
    },
    {
      detail: {
        tags: ['App', 'Queue'],
      },
      query: t.Partial(
        t.Object({
          search: t.String({ default: '*', description: 'Search by id' }),
          offset: t.Number({ default: 0 }),
          limit: t.Number({ default: 10 }),
        }),
      ),
      response: {
        '200': t.Object({
          count: t.Number(),
          total: t.Number(),
          items: t.Array(
            t.Object({
              id: t.String(),
              status: t.Union([
                t.Literal(QUEUE_STATUS.IN_QUEUE),
                t.Literal(QUEUE_STATUS.FAILED),
                t.Literal(QUEUE_STATUS.SUCCESS),
                t.Literal(QUEUE_STATUS.IN_PROGRESS),
              ]),
              logs: t.String(),
              value: t.String(),
            }),
          ),
        }),
      },
    },
  )
