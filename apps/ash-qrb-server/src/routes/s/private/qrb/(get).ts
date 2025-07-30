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
        order: query?.order?.by
          ? query?.order
          : { by: 'desk', value: 'createdAt' },
        page: Number(query?.page) || 1,
        pageSize: Number(query?.pageSize) || 100,
        filter: query?.filter,
      }

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
