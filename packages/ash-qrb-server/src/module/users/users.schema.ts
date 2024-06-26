import { companiesSchema } from '@root/module/companies/companies.schema'
import { generateId } from '@root/utils'
import { relations, sql } from 'drizzle-orm'
import { boolean, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'

export const usersRoles = {
  admin: 400,
  manager: 300,
  costumer: 200,
  client: 100,
}

export const usersStatus = {
  validation: 100,
  active: 200,
  blocked: 300,
}
export const usersDefaultColumns = {
  id: text('id').default(generateId()).primaryKey(),
  role: integer('role').default(usersRoles.client),
  fullName: varchar('full_name', { length: 50 }).notNull(),
  phone: varchar('phone', { length: 18 }).notNull(),
  status: integer('status').default(usersStatus.validation),
  hasMessenger: text('has_messenger')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  tags: text('tags').array().notNull().default(sql`ARRAY[]::text[]`),
  hideContacts: boolean('hide_contacts').default(false),
  qr: text('qr'),
  companyId: text('company_id').references(() => companiesSchema.id),
  createdAt: text('created_at').default(sql`now()`),
  updatedAt: text('updated_at').default(sql`now()`),
}

export const usersSchema = pgTable('users', usersDefaultColumns)
export const usersRelations = relations(usersSchema, ({ one }) => ({
  company: one(companiesSchema, {
    fields: [usersSchema.companyId],
    references: [companiesSchema.id],
  }),
}))
