import { defaultItemsResponse } from '@root/utils'
import type { AnyPgTable } from 'drizzle-orm/pg-core'
import type { XataHttpDatabase } from 'drizzle-orm/xata-http/driver'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { Elysia } from 'elysia'

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
      const selectSchema = createSelectSchema(schema)
      const insertSchema = createInsertSchema(schema)

      this.getAll(name, elysia, schema)
    }

    return elysia
  }

  getAll(name: string, plugin: Elysia, schema: AnyPgTable) {
    plugin.get(
      `/${name}`,
      async ({ error }) => {
        try {
          const items = await this.db.select().from(schema)

          return defaultItemsResponse(items, name)
        } catch (e) {
          return error(
            400,
            `Cant select collection from db. Error: ${(e as Error).message}`,
          )
        }
      },
      {
        detail: {
          tags: ['App'],
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
}
