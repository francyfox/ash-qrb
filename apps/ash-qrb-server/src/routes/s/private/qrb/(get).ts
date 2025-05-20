import type { ElysiaApp } from '@/server.ts'
import { db } from '@/core/db'
import {
  filterByFieldCollectionItems,
  type IResponseOptions,
} from '@/core/services/response-format.ts'
import { qrbSchema } from '@/schema/qrb.ts'

export default (app: ElysiaApp) =>
  app.get('', async ({ query, error }) => {
    const { name } = query
    const options: IResponseOptions = {
      order: (query as any).order || { by: 'desc', value: 'id' },
      page: Number(query?.page) || 1,
      pageSize: Number(query?.pageSize) || 100,
    }

    const response = await filterByFieldCollectionItems(
      qrbSchema,
      'name',
      name,
      options,
    )

    return response
  })
