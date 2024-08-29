import { bytea } from '@root/module/db/db.custom';
import { usersSchema } from '@root/module/users/users.schema';
import { integer, pgTable, serial } from 'drizzle-orm/pg-core';

export const usersSessionDefaultColumns = {
  id: serial('id').primaryKey(),
  userId: integer('company_id').references(() => usersSchema.id),
  activeExpires: bytea('active_expires'),
  idleExpires: bytea('idle_expires')
}

export const usersSessionSchema = pgTable('users_session', usersSessionDefaultColumns)