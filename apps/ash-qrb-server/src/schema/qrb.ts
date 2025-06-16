import { usersSchema } from '@/schema/user.ts'
import { generateId } from '@/utils/generate.ts'
import { sql } from 'drizzle-orm'
import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

export const QRB_STATUS = {
  DISABLED: 0,
  ACTIVE: 1,
}

export const qrbDefaultColumns = {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  status: integer('status').default(QRB_STATUS.ACTIVE),
  name: varchar('name', { length: 70 }).notNull(),
  body: jsonb('body').default({ en: null, ru: null }),
  qrCode: text('qr_code'),
  userId: text('user_id')
    .notNull()
    .references(() => usersSchema.id),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
}

export const qrbSchema = pgTable('qrb', qrbDefaultColumns)
export const qrbSelectSchema = createSelectSchema(qrbSchema)
export const qrbInsertSchema = createInsertSchema(qrbSchema)
export type TQRB = typeof qrbSchema.$inferSelect
