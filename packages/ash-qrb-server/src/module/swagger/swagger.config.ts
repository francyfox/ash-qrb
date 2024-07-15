// @ts-nocheck
import type { ElysiaSwaggerConfig } from '@elysiajs/swagger/dist/types'
import {
  createRandomUser,
  createRandomUsers,
} from '@root/module/users/users.fake'
import { usersSelectSchema } from '@root/module/users/users.schema'

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
          // $ref: '#/components/schemas/Error',
        },
        Unauthorized: {
          description: 'Unauthorized',
          // $ref: '#/components/schemas/Error',
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
              type: 'number',
            },
            message: {
              type: 'string',
            },
          },
          required: ['code', 'message', '$ref'],
          example: {
            code: 400,
            message: 'Error message',
          },
        },
        usersOne: {
          ...usersSelectSchema,
          example: { item: createRandomUser() },
        },
        usersMany: {
          type: 'array',
          required: false,
          items: {
            type: 'object',
            properties: {
              count: {
                type: 'number',
              },
              items: usersSelectSchema,
            },
          },
          example: {
            count: createRandomUsers.length,
            items: createRandomUsers,
          },
        },
        paymentsOne: {
          type: 'object',
        },
        paymentsMany: {
          type: 'object',
        },
        companiesOne: {
          type: 'object',
        },
        companiesMany: {
          type: 'object',
        },
      },
    },
  },
  scalarConfig: {},
} satisfies ElysiaSwaggerConfig
