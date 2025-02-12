import {
  type IResponseOptions,
  getCollectionItems,
  validationCollectionItems,
} from '@/core/services/response-format.ts'
import { usersSchema, usersSelectSchema } from '@/schema/user.ts'
import type { ElysiaApp } from '@/server.ts'

export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ query }) => {
      const options: IResponseOptions = {
        order: (query as any).order || { by: 'desc', value: 'id' },
        page: Number(query?.page) || 1,
        pageSize: Number(query?.pageSize) || 100,
      }

      const response = await getCollectionItems(usersSchema, options)

      return response
    },
    validationCollectionItems(usersSelectSchema),
  )
