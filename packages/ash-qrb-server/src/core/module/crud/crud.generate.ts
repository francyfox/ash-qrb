import { defaultError } from '@root/core/module/error/error';
import { ERROR_DB_TRANSACTION, ERROR_NOT_FOUND } from '@root/core/module/error/error.const';
import { usersSelectSchema } from '@root/module/users/users.schema';
import { defaultItemResponse, defaultItemsResponse } from '@root/utils'
import { eq } from 'drizzle-orm'
import type { AnyPgTable } from 'drizzle-orm/pg-core'
import type { PgliteDatabase } from 'drizzle-orm/pglite'
import { createInsertSchema } from 'drizzle-typebox'
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
  readonly db: PgliteDatabase<Record<string, unknown>>
  readonly schemaList: CrudParameters[]
  constructor(
    db: PgliteDatabase<Record<string, unknown>>,
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
      // @ts-ignore
      async ({ error }) => {
        try {
          const items = await this.db.select().from(schema)

          return defaultItemsResponse(items)
        } catch (e) {
          return error(
            '404',
            {
              name: ERROR_DB_TRANSACTION.name,
              message: `Cant select collection from db. Error: ${(e as Error).message}`
            }
          )
        }
      },

      {
        response: {
          '200': t.Object({
            items: t.Array(usersSelectSchema),
            count: t.Number()
          }),
          '404': t.Object(defaultError),
        },
        detail: {
          tags: [name],
          description: `Get ${name} collection`,
        },
      },
    )
  }
  getById(name: string, plugin: Elysia, schema: AnyPgTable) {
    plugin.get(
      `/${name}/:id`,
      // @ts-ignore
      async ({ params, error }) => {
        const { id } = params

        try {
          const item = await this.db
            .select()
            .from(schema)
            // biome-ignore lint/suspicious/noExplicitAny: any item have id
            .where(eq((schema as any).id, id))

          if (!item[0]) return error('404', ERROR_NOT_FOUND)

          return defaultItemResponse(item[0])
        } catch (e) {
          return error(
            '400',
            {
              name: ERROR_DB_TRANSACTION.name,
              message: `Cant select item id ${id} from ${name}. Error: ${(e as Error).message}`
            },
          )
        }
      },
      {
        params: t.Object({
          id: t.Numeric(),
        }),
        response: {
          '200': t.Object({
            item: usersSelectSchema
          }),
          '400': t.Object(defaultError),
          '404': t.Object(defaultError),
        },
        detail: {
          tags: [name],
          description: `Get single item from ${name} by id`,
        },
      },
    )
  }

  add(name: string, plugin: Elysia, schema: AnyPgTable) {
    plugin.post(
      `/${name}`,
      // @ts-ignore
      async ({ body, error }) => {
        try {
          // TODO: check if exist? CONFLICT ERROR?
          // const exist = await this.db.select().from(schema).where(eq((schema as any).id, id))
          const item = await this.db.insert(schema).values(body)

          return defaultItemResponse(item)
        } catch (e) {
          return error(
            '400',
            {
              name: ERROR_DB_TRANSACTION.name,
              message: `Cant insert item to ${name}. Error: ${(e as Error).message}`
            },
          )
        }
      },
      {
        response: {
          '201': t.Object({
            item: usersSelectSchema
          }),
          '400': t.Object(defaultError)
        },
        // @ts-ignore
        body: createInsertSchema(schema),
        detail: {
          tags: [name],
          description: `Insert item to ${name}`,
        },
      },
    )
  }

  deleteById(name: string, plugin: Elysia, schema: AnyPgTable) {
    plugin.delete(
      `/${name}/:id`,
      // @ts-ignore
      async ({ params, error }) => {
        const { id } = params

        try {
          const item = await this.db
            .delete(schema)
            // biome-ignore lint/suspicious/noExplicitAny: any item have id
            .where(eq((schema as any).id, id))
            .returning()

          if (!item[0]) return error('404', ERROR_NOT_FOUND)

          return defaultItemResponse(item[0])
        } catch (e) {
          return error(
            '400',
            {
              name: ERROR_DB_TRANSACTION.name,
              message: `Cant delete item id ${id} from ${name}. Error: ${(e as Error).message}`
            }
          )
        }
      },
      {
        params: t.Object({
          id: t.Numeric(),
        }),
        response: {
          '200': t.Object({
            item: usersSelectSchema
          }),
          '404': t.Object(defaultError),
          '400': t.Object(defaultError),
        },
        detail: {
          tags: [name],
          description: `Delete item from ${name}`,
        },
      },
    )
  }

  patchById(name: string, plugin: Elysia, schema: AnyPgTable) {
    plugin.patch(
      `/${name}/:id`,
      // @ts-ignore
      async ({ params, body, error }) => {
        const { id } = params
        try {
          const item = await this.db
            .update(schema)
            // @ts-ignore
            .set(body)
            // @ts-ignore
            .returning({ updatedId: schema.id })

          if (!item[0]) return error('404', ERROR_NOT_FOUND)

          return defaultItemResponse(item[0])
        } catch (e) {
          return error(
            '400',
            {
              name: ERROR_DB_TRANSACTION.name,
              message: `Cant patch item id ${id} from ${name}. Error: ${(e as Error).message}`
            },
          )
        }
      },
      {
        params: t.Object({
          id: t.Numeric(),
        }),
        response: {
          '200': t.Object({
            item: usersSelectSchema
          }),
          '404': t.Object(defaultError),
          '400': t.Object(defaultError),
        },
        detail: {
          tags: [name],
          description: `Patch item from ${name}`,
        },
      },
    )
  }
}
