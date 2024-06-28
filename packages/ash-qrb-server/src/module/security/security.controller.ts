import { jwt } from '@elysiajs/jwt'
import { env } from '@root/env'
import {
  handlerProfile,
  handlerSignIn,
  handlerSignOut,
  handlerSignUp,
} from '@root/module/security/security.handler'
import { usersSchema } from '@root/module/users/users.schema'
import { createInsertSchema } from 'drizzle-typebox'
import { Elysia, t } from 'elysia'

export const securityController = () => {
  const plugin = new Elysia()

  plugin.use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET_KEY,
    }),
  )

  plugin.group('/auth', (app) =>
    app.guard(
      {
        body: t.Object({
          phone: t.String(),
          password: t.String(),
        }),
      },
      (app) =>
        app
          .post('/sign-in', handlerSignIn, {
            detail: {
              tags: ['auth'],
            },
          })
          .post('/sign-up', handlerSignUp, {
            // @ts-ignore
            body: createInsertSchema(usersSchema),
            detail: {
              tags: ['auth'],
            },
          }),
    ),
  )

  plugin
    .get(
      '/auth/profile',
      // @ts-ignore
      handlerProfile,
      {
        detail: {
          tags: ['auth'],
        },
      },
    )
    .get('/auth/sign-out', handlerSignOut, {
      detail: {
        tags: ['auth'],
      },
    })

  return plugin
}
