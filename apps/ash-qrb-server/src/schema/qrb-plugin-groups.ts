import { qrbPluginSchema } from '@/schema/qrb-plugin.ts'
import { qrbSchema } from '@/schema/qrb.ts'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

export const qrbPluginGroupsDefaultColumns = {
  qrbId: text('qrb_id')
    .notNull()
    .references(() => qrbSchema.id),
  pluginId: text('plugin_id')
    .notNull()
    .references(() => qrbPluginSchema.id),
}

export const qrbPluginGroupsSchema = pgTable(
  'qrb_plugin_groups',
  qrbPluginGroupsDefaultColumns,
)
export const qrbPluginGroupsSelectSchema = createSelectSchema(
  qrbPluginGroupsSchema,
)
export const qrbPluginGroupsInsertSchema = createInsertSchema(
  qrbPluginGroupsSchema,
)
export type TQRBPluginGroups = typeof qrbPluginGroupsSchema.$inferSelect

// db.select()
//   .from(qrbPluginGroupsSchema)
//   .leftJoin(
//     qrbPluginGroupsSchema,
//     eq(qrbPluginGroupsSchema.qrbId, qrbSchema.id),
//   )
//   .leftJoin(
//     qrbPluginGroupsSchema,
//     eq(qrbPluginGroupsSchema.pluginId, qrbPluginSchema.id),
//   )
