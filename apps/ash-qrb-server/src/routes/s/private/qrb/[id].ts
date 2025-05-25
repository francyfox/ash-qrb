import {
  getCollectionItemEqual,
  validationCollectionItem,
} from '@/core/services/response-format.ts'
import type { ElysiaApp } from '@/server.ts'

import { qrbSchema, qrbSelectSchema } from '@/schema/qrb.ts'
import { NotFoundError } from 'elysia'

export default (app: ElysiaApp) =>
  app.get(
    '',
    async ({ params, error }) => {
      const { id } = params

      const response = await getCollectionItemEqual(qrbSchema, 'id', id)
      if (response.item === undefined)
        throw new Error(`QRB with id [${id}] not found.`)

      return response
    },
    validationCollectionItem(qrbSelectSchema),
  )
