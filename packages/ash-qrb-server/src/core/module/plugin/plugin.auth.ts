import Lucia from '@elysiajs/lucia-auth'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { env } from '@root/env'
import { db } from '@root/module/db/db'
import { usersSessionSchema } from '@root/module/users-session/users-session.schema'
import { type TUser, usersSchema } from '@root/module/users/users.schema'

export const pluginLucia = Lucia({
  // @ts-ignore
  adapter: () =>
    // @ts-ignore
    new DrizzlePostgreSQLAdapter(db, usersSessionSchema, usersSchema),
  getUserAttributes({ id, status, role }: TUser) {
    return {
      id,
      status,
      role
    }
  },
  cookie: {
    sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
    secure: env.NODE_ENV === 'production'
  }
})
