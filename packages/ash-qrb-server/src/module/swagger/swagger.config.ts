import type { ElysiaSwaggerConfig } from '@elysiajs/swagger/dist/types'
import {
  createRandomUser,
  createRandomUsers,
} from '@root/module/users/users.fake'
import { usersSchema } from '@root/module/users/users.schema'
import { createSelectSchema } from 'drizzle-typebox'

export default {
  documentation: {
    info: {
      title: 'ASH-QRB Documentation',
      version: '1.0.0',
    },
    tags: [
      { name: 'App', description: 'General endpoints' },
      { name: 'users', description: 'Users endpoints' },
      { name: 'payments', description: 'Payments endpoints' },
      { name: 'companies', description: 'Companies endpoints' },
      { name: 'auth', description: 'Authentication endpoints' },
    ],
    components: {
      responses: {
        NotFound: {
          description: 'The specified resource was not found',
          $ref: '#/components/schemas/Error',
        },
        Unauthorized: {
          description: 'Unauthorized',
          $ref: '#/components/schemas/Error',
        },
      },
      schemas: {
        Health: {
          type: 'string',
          description: 'Returns ok',
          example: 'ok',
        },
        Error: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
          required: ['code', 'message'],
        },
        User: {
          type: 'object',
          properties: createSelectSchema(usersSchema),
          example: { item: createRandomUser() },
        },
        Users: {
          type: 'array',
          items: {
            type: 'object',
            properties: createSelectSchema(usersSchema),
          },
        },
      },
    },
  },
  scalarConfig: {},
} satisfies ElysiaSwaggerConfig
