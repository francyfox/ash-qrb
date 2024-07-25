import { companiesSchema } from '@root/module/companies/companies.schema'
import { usersRoles, usersStatus } from '@root/module/users/users.enum'
import { generateId } from '@root/utils'
import { relations, sql } from 'drizzle-orm'
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

export const usersDefaultColumns = {
  id: serial('id').primaryKey(),
  publicId: text('publicId').default(generateId()).notNull(),
  role: integer('role').default(usersRoles.client),
  fullName: varchar('full_name', { length: 50 }).notNull(),
  password: text('password'),
  phone: varchar('phone', { length: 20 }).notNull(),
  status: integer('status').default(usersStatus.validation),
  hasMessenger: text('has_messenger')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  tags: text('tags').array().default(sql`ARRAY[]::text[]`),
  hideContacts: boolean('hide_contacts').default(false),
  qr: text('qr'),
  companyId: integer('company_id').references(() => companiesSchema.id),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
}

// export const usersSelectSchema = createSelectSchema(usersSchema)
export const usersSchema = pgTable('users', usersDefaultColumns)
export const usersRelations = relations(usersSchema, ({ one }) => ({
  company: one(companiesSchema, {
    fields: [usersSchema.companyId],
    references: [companiesSchema.id],
  }),
}))

export const usersSelectSchema = createSelectSchema(usersSchema)
export const usersInsertSchema = createInsertSchema(usersSchema)
export type TUser = typeof usersSchema.$inferSelect
