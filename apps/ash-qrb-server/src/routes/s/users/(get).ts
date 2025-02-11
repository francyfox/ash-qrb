import { db } from '@/core/db'
import { usersSchema, usersSelectSchema } from '@/schema/user.ts'
import type { ElysiaApp } from '@/server.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ body, error }) => {
      const users = await db.select().from(usersSchema)

      return {
        items: users,
        count: users.length,
      }
    },
    {
      response: {
        200: t.Object({
          items: usersSelectSchema,
          count: t.Number(),
        }),
      },
    },
  )
