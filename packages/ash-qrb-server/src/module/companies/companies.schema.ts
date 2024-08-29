import { usersSchema } from '@root/module/users/users.schema'
import { generateId } from '@root/utils'
import { relations, sql } from 'drizzle-orm'
import { bigint, integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

// @ts-ignore
export const companiesDefaultColumns = {
  id: serial('id').primaryKey(),
  publicId: text('publicId').unique().default(generateId()).notNull(),
  leadId: integer('lead_id').notNull(), // TODO: cant use one-to-one
  name: varchar('name', { length: 50 }).notNull(),
  bin: bigint('bin', { mode: 'bigint'}),
  registerAt: text('register_at'),
  createdAt: text('created_at').default(sql`now()`),
  updatedAt: text('updated_at').default(sql`now()`),
}

export const companiesSchema = pgTable('companies', companiesDefaultColumns)

export const companiesRelations = relations(companiesSchema, ({ many }) => ({
  users: many(usersSchema),
}))
