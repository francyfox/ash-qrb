import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

export const verificationDefaultColumns = {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
}

export const verificationSchema = pgTable(
  'verification',
  verificationDefaultColumns,
)
export const verificationSelectSchema = createSelectSchema(verificationSchema)
export const verificationInsertSchema = createInsertSchema(verificationSchema)
export type TVerification = typeof verificationSchema.$inferSelect
