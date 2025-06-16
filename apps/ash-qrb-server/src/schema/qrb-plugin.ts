import { generateId } from '@/utils/generate.ts'
import { jsonb, pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

export const defaultQrbPluginColumns = {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  name: text('name').notNull(),
  config: jsonb().default({
    type: 'object',
    required: ['author'],
    properties: {
      author: {
        type: 'string',
        const: 'noname',
      },
    },
  }),
  npm: text('npm'),
  git: text('git'),
}

export const qrbPluginSchema = pgTable('qrb_plugin', defaultQrbPluginColumns)
export const qrbPluginSelectSchema = createSelectSchema(qrbPluginSchema)
export const qrbPluginInsertSchema = createInsertSchema(qrbPluginSchema)
export type TQRBPlugin = typeof qrbPluginSchema.$inferSelect
