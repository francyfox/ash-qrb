import { sql } from 'drizzle-orm'
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const paymentsDefaultColumns = {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  qr: text('qr').notNull(),
  createdAt: text('created_at').default(sql`now()`),
  updatedAt: text('updated_at').default(sql`now()`),
}

export const paymentsSchema = pgTable('payments', paymentsDefaultColumns)
