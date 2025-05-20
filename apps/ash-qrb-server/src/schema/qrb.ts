import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { sql } from 'drizzle-orm'
import { usersSchema } from '@/schema/user.ts'

export const QRB_STATUS = {
  DISABLED: 0,
  ACTIVE: 1,
}

export const qrbDefaultColumns = {
  id: text('id').primaryKey(),
  status: integer('status').default(QRB_STATUS.ACTIVE),
  name: varchar('name', { length: 70 }).notNull(),
  description: text('description'),
  qrCode: text('qr_code'),
  userId: serial('user_id')
    .notNull()
    .references(() => usersSchema.id),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
}

export const qrbSchema = pgTable('qrb', qrbDefaultColumns)
export const qrbSelectSchema = createSelectSchema(qrbSchema)
export const qrbInsertSchema = createInsertSchema(qrbSchema)
export type TQRB = typeof qrbSchema.$inferSelect
