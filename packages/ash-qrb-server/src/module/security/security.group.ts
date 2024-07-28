import { jwt } from '@elysiajs/jwt'
import { env } from '@root/env'
import {
  handlerProfile,
  handlerSignIn,
  handlerSignOut,
  handlerSignUp,
} from '@root/module/security/security.handler'
import { createRandomUser } from '@root/module/users/users.fake'
import {
  usersInsertSchema,
  usersSchema,
  usersSelectSchema,
} from '@root/module/users/users.schema'
import { createInsertSchema } from 'drizzle-typebox'
import { Elysia, t } from 'elysia'

export const securityGroup = (config?: { prefix: string }) => {
  return new Elysia({
    name: 'qrb-security',
    seed: config,
  })
    .group('/auth', (app) =>
      app.guard(
        {
          body: t.Object({
            phone: t.String(),
            password: t.String(),
          }),
        },
        (app) =>
          app
            // @ts-ignore
            .post('/sign-in', handlerSignIn, {
              body: t.Object({
                phone: t.String(),
                password: t.String(),
              }),
              response: t.Object({}),
              detail: {
                tags: ['auth'],
                description: 'Auth as user',
              },
            })
            // @ts-ignore
            .post('/sign-up', handlerSignUp, {
              body: usersInsertSchema,
              response: t.Object({
                item: usersSelectSchema,
              }),
              detail: {
                tags: ['auth'],
                description: 'Create a new user',
              },
            }),
      ),
    )
    .get(
      '/auth/profile',
      // @ts-ignore
      handlerProfile,
      {
        response: t.Object({
          item: usersSelectSchema,
        }),
        detail: {
          tags: ['auth'],
        },
      },
    )
    .get('/auth/sign-out', handlerSignOut, {
      detail: {
        tags: ['auth'],
        responses: {
          '200': {
            description: 'Remove cookie',
          },
        },
      },
    })
}
