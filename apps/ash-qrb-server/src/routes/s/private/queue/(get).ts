import type { IResponseOptions } from '@/core/services/response-format.ts'
import { QueueSchema } from '@/modules/queue/queue.model.ts'
import { Queue } from '@/modules/queue/queue.ts'
import type { ElysiaApp } from '@/server.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.get(
    '',
    async ({
      query,
    }: {
      query: { page: number; show: any[]; filter?: { search: string } }
    }) => {
      console.log(query)
      const options: IResponseOptions = {
        page: Number(query?.page) || 1,
        filter: query?.filter,
      }

      const advancedReturns = [...query.show, ...['id', 'status']]

      const { items, total } = await Queue.service.getAll({
        search: options.filter?.search || '*',
        limit: 10,
        offset: (options.page - 1) * 10,
        returns: advancedReturns,
      })

      console.log(items)

      return {
        items,
        count: items.length,
        total,
      }
    },
    {
      detail: {
        tags: ['App', 'Queue'],
        description:
          'Use show for display advanced fields. Logs display errors. Value is serialized JSON with main information [checksum, path, extension]',
      },
      query: t.Partial(
        t.Object(
          {
            filter: t.Partial(
              t.Object({
                search: t.String({ description: 'Redis FT.SEARCH <search>' }),
              }),
            ),
            page: t.Number({ default: 1 }),
            show: t.Array(t.String()),
          },
          {
            default: {
              filter: {
                search: '*',
              },
              page: 1,
              show: [],
            },
          },
        ),
      ),
      response: {
        '200': t.Object({
          count: t.Number(),
          total: t.Number(),
          items: t.Array(t.Partial(QueueSchema as any)),
        }),
      },
    },
  )
