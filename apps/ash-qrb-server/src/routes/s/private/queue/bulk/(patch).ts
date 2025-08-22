import { db } from '@/core/db'
import { QueueSchema } from '@/modules/queue/queue.model.ts'
import { Queue } from '@/modules/queue/queue.ts'
import type { ElysiaApp } from '@/server.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.patch(
    '',
    async ({ body }: { body: { ids: string[]; fields: object } }) => {
      const { ids, fields } = body

      const requests = ids.map((id) => Queue.service.updateItem(id, fields))
      await Promise.all(requests)
    },
    {
      detail: { tags: ['App', 'Queue'] },
      body: t.Object({
        ids: t.Array(t.String()),
        fields: t.Omit(QueueSchema as any, ['id']),
      }),
    },
  )
