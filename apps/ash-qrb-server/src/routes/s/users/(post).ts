import { db } from '@/core/db'
import { usersInsertSchema, usersSchema } from '@/schema/user.ts'
import type { ElysiaApp } from '@/server.ts'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
  app.post(
    '',
    async ({ body, error }) => {
      const { user } = body
      await db.insert(usersSchema).values(user)
    },
    {
      body: t.Object({
        user: usersInsertSchema,
      }),
    },
  )
