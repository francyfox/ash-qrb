import { defaultError } from '@root/core/module/error/error';
import { handlerProfile, handlerSignIn, handlerSignOut, handlerSignUp } from '@root/module/security/security.handler'
import { usersInsertSchema, usersSelectSchema } from '@root/module/users/users.schema'
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
              response: {
                '201': t.Unknown(),
                '403': t.Object(defaultError)
              },
              detail: {
                tags: ['auth'],
                description: 'Auth as user',
              },
            })
            // @ts-ignore
            .post('/sign-up', handlerSignUp, {
              body: usersInsertSchema,
              response: {
                '201': t.Object({
                  item: usersSelectSchema
                }),
              },
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
