import { usersSchema } from '@root/module/users/users.schema'
import { generateId } from '@root/utils'
import { relations, sql } from 'drizzle-orm'
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'
export const companiesDefaultColumns = {
  id: serial('id').primaryKey(),
  publicId: text('publicId').default(generateId()).notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  payments: text('payments').array().notNull().default(sql`ARRAY[]::text[]`),
  createdAt: text('created_at').default(sql`now()`),
  updatedAt: text('updated_at').default(sql`now()`),
}

export const companiesSchema = pgTable('companies', companiesDefaultColumns)

export const companiesRelations = relations(companiesSchema, ({ many }) => ({
  users: many(usersSchema),
}))
