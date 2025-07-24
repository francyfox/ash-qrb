import {
  type IResponseOptions,
  filterByFieldCollectionItems,
  validationCollectionItems,
} from '@/core/services/response-format.ts'
import { qrbSchema, qrbSelectSchema } from '@/schema/qrb.ts'
import type { ElysiaApp } from '@/server.ts'

export default (app: ElysiaApp) =>
  app.get(
    '',
    async ({ query, error }) => {
      const options: IResponseOptions = {
        order: (query as any).order || { by: 'ask', value: 'id' },
        page: Number(query?.page) || 1,
        pageSize: Number(query?.pageSize) || 100,
        filter: query?.filter,
      }

      console.log(query)

      const response = await filterByFieldCollectionItems(
        qrbSchema,
        'name',
        query?.filter.search,
        options,
      )

      return response
    },
    validationCollectionItems(qrbSelectSchema),
  )
