import {
  capitalized,
  defaultItemResponse,
  defaultItemsResponse,
  singular,
} from '@root/utils'
import { eq } from 'drizzle-orm'
import type { AnyPgTable } from 'drizzle-orm/pg-core'
import type { XataHttpDatabase } from 'drizzle-orm/xata-http/driver'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { Elysia, t } from 'elysia'

type CrudParametersIncludeAndExclude =
  | 'getAll'
  | 'getById'
  | 'add'
  | 'deleteById'
  | 'patchById'
export interface CrudParameters {
  schema: AnyPgTable
  include?: CrudParametersIncludeAndExclude[]
  exclude?: CrudParametersIncludeAndExclude[]
  security?: boolean
}
export class CrudApi {
  readonly db: XataHttpDatabase<Record<string, unknown>>
  readonly schemaList: CrudParameters[]
  constructor(
    db: XataHttpDatabase<Record<string, unknown>>,
    schemaList: CrudParameters[],
  ) {
    this.db = db
    this.schemaList = schemaList
  }

  generate(config?: { prefix: string }) {
    const plugin = new Elysia({
      name: 'qrb-crud',
      seed: config,
    })

    for (const crudParams of this.schemaList) {
      const { schema, include, exclude } = crudParams
      // @ts-ignore
      const name = schema[Object.getOwnPropertySymbols(schema)[0]]
      const condition = (name: CrudParametersIncludeAndExclude) =>
        include?.includes(name) || !exclude?.includes(name)

      if (condition('getAll')) {
        this.getAll(name, plugin, schema)
      }

      if (condition('getById')) {
        this.getById(name, plugin, schema)
      }

      if (condition('add')) {
        this.add(name, plugin, schema)
      }

      if (condition('deleteById')) {
        this.deleteById(name, plugin, schema)
      }

      if (condition('patchById')) {
        this.patchById(name, plugin, schema)
      }
    }

    return plugin
  }

  getAll(name: string, plugin: Elysia, schema: AnyPgTable) {
    plugin.get(
      `/${name}`,
      async ({ error }) => {
        try {
          const items = await this.db.select().from(schema)

          return defaultItemsResponse(items)
        } catch (e) {
          return error(
            400,
            `Cant select collection from db. Error: ${(e as Error).message}`,
          )
        }
      },
      {
        detail: {
          tags: [name],
          description: `Get ${name} collection`,
          responses: {
            '200': {
              description: 'Successful response',
              $ref: `#/components/schemas/${name}Many`,
            },
            '400': {
              description: 'Error response',
            },
            '401': {
              $ref: '#/components/responses/Unauthorized',
            },
          },
        },
      },
    )
  }
  getById(name: string, plugin: Elysia, schema: AnyPgTable) {
    plugin.get(
      `/${name}/:id`,
      async ({ params, error }) => {
        const { id } = params

        try {
          const item = await this.db
            .select()
            .from(schema)
            // biome-ignore lint/suspicious/noExplicitAny: any item have id
            .where(eq((schema as any).id, id))

          return defaultItemResponse(item)
        } catch (e) {
          return error(
            400,
            `Cant select item id ${id} from ${name}. Error: ${(e as Error).message}`,
          )
        }
      },
      {
        params: t.Object({
          id: t.Numeric(),
        }),
        detail: {
          tags: [name],
          description: `Get single item from ${name} by id`,
          responses: {
            '200': {
              description: 'Successful response',
              $ref: `#/components/schemas/${name}One`,
            },
            '400': {
              description: 'Error response',
            },
            '401': {
              $ref: '#/components/responses/Unauthorized',
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
          },
        },
      },
    )
  }

  add(name: string, plugin: Elysia, schema: AnyPgTable) {
    plugin.post(
      `/${name}`,
      async ({ body, error }) => {
        try {
          const item = await this.db.insert(schema).values(body)

          return defaultItemResponse(item)
        } catch (e) {
          return error(
            400,
            `Cant insert item to ${name}. Error: ${(e as Error).message}`,
          )
        }
      },
      {
        // @ts-ignore
        body: createInsertSchema(schema),
        detail: {
          tags: [name],
          description: `Insert item to ${name}`,
          responses: {
            '201': {
              description: 'Successful response. Item created',
            },
            '400': {
              description: 'Error response',
            },
          },
        },
      },
    )
  }

  deleteById(name: string, plugin: Elysia, schema: AnyPgTable) {
    plugin.delete(
      `/${name}/:id`,
      async ({ params, error }) => {
        const { id } = params

        try {
          const item = await this.db
            .delete(schema)
            // biome-ignore lint/suspicious/noExplicitAny: any item have id
            .where(eq((schema as any).id, id))
            .returning()

          return defaultItemResponse(item)
        } catch (e) {
          return error(
            400,
            `Cant delete item id ${id} from ${name}. Error: ${(e as Error).message}`,
          )
        }
      },
      {
        params: t.Object({
          id: t.Numeric(),
        }),
        detail: {
          tags: [name],
          description: `Delete item from ${name}`,
          responses: {
            '200': {
              description: 'Successful response',
            },
            '400': {
              description: 'Error response',
            },
          },
        },
      },
    )
  }

  patchById(name: string, plugin: Elysia, schema: AnyPgTable) {
    plugin.patch(
      `/${name}/:id`,
      async ({ params, body, error }) => {
        try {
          const item = await this.db
            .update(schema)
            // @ts-ignore
            .set(body)
            // @ts-ignore
            .returning({ updatedId: schema.id })

          return defaultItemResponse(item)
        } catch (e) {
          return error(
            400,
            `Cant insert item to ${name}. Error: ${(e as Error).message}`,
          )
        }
      },
      {
        params: t.Object({
          id: t.Numeric(),
        }),
        detail: {
          tags: [name],
          description: `Patch item from ${name}`,
          responses: {
            '200': {
              description: 'Successful response',
            },
            '400': {
              description: 'Error response',
            },
          },
        },
      },
    )
  }
}
