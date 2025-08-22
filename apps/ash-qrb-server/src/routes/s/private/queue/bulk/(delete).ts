import { Queue } from '@/modules/queue/queue.ts'
import type { ElysiaApp } from '@/server.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.delete(
    '',
    async ({ body }: { body: { ids: string[] } }) => {
      const { ids } = body

      const requests = ids.map((id) => Queue.service.removeItem(id))
      await Promise.all(requests)
    },
    {
      detail: { tags: ['App', 'Queue'] },
      body: t.Object({
        ids: t.Array(t.String()),
      }),
    },
  )
