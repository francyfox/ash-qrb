import { defaultItemResponse, defaultItemsResponse } from '@root/utils'
import { eq } from 'drizzle-orm'
import type { AnyPgTable } from 'drizzle-orm/pg-core'
import type { XataHttpDatabase } from 'drizzle-orm/xata-http/driver'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { Elysia, t } from 'elysia'

export class CrudApi {
  readonly db: XataHttpDatabase<Record<string, unknown>>
  readonly schemaList: AnyPgTable[]
  constructor(
    db: XataHttpDatabase<Record<string, unknown>>,
    schemaList: AnyPgTable[],
  ) {
    this.db = db
    this.schemaList = schemaList
  }

  generate() {
    const elysia = new Elysia()
    elysia.decorate('plugin', 'crud')

    for (const schema of this.schemaList) {
      // @ts-ignore
      const name = schema[Object.getOwnPropertySymbols(schema)[0]]

      this.getAll(name, elysia, schema)
      this.getById(name, elysia, schema)
      this.add(name, elysia, schema)
      this.deleteById(name, elysia, schema)
      this.patchById(name, elysia, schema)
    }

    return elysia
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
            },
            '400': {
              description: 'Error response',
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
            },
            '400': {
              description: 'Error response',
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
          // @ts-ignore
          const item = await this.db
            .update(schema)
            .set(body)
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
