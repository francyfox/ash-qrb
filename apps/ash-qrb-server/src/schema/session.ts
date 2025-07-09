import { usersSchema } from '@/schema/user.ts'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

export const sessionDefaultColumns = {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => usersSchema.id, { onDelete: 'cascade' }),
}

export const sessionSchema = pgTable('session', sessionDefaultColumns)
export const sessionSelectSchema = createSelectSchema(sessionSchema)
export const sessionInsertSchema = createInsertSchema(sessionSchema)
export type TSession = typeof sessionSchema.$inferSelect
