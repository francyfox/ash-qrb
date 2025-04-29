import { generateId } from '@/utils/generate.ts'
import { sql } from 'drizzle-orm'
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

export const USER_STATUS = {
  CREATED: 0,
  VERIFICATION: 100,
  ACTIVE: 200,
  DISABLED: 300,
}

export const usersDefaultColumns = {
  id: text('id').primaryKey(),
  publicId: text('public_id').unique().default(generateId()).notNull(),
  status: integer('status').default(USER_STATUS.CREATED),
  image: text('image'),
  name: varchar('name', { length: 70 }).notNull(),
  companyName: varchar('company_name', { length: 40 }).notNull(),
  email: varchar('email', { length: 38 }).unique(),
  emailVerified: boolean('email_verified').notNull(),
  phone: varchar('phone', { length: 12 }).unique(),
  phoneVerified: boolean('phone_verified').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
}

export const usersSchema = pgTable('users', usersDefaultColumns)

export const usersSelectSchema = createSelectSchema(usersSchema)
export const usersInsertSchema = createInsertSchema(usersSchema)
export type TUser = typeof usersSchema.$inferSelect
