import {
  getCollectionItemEqual,
  validationCollectionItem,
} from '@/core/services/response-format.ts'
import { usersSchema, usersSelectSchema } from '@/schema/user.ts'
import type { ElysiaApp } from '@/server.ts'

export default (app: ElysiaApp) =>
  app.get(
    '',
    async ({ params }) => {
      const response = await getCollectionItemEqual(
        usersSchema,
        'id',
        Number((params as any).id),
      )

      return response
    },
    validationCollectionItem(usersSelectSchema),
  )
