import { generateId } from '@root/utils';
import { sql } from 'drizzle-orm';
import { integer, varchar } from 'drizzle-orm/pg-core';
import { serial, text } from 'drizzle-orm/pg-core';

export const qrbsDefaultColumns = {
  id: serial('id').primaryKey(),
  publicId: text('publicId').unique().default(generateId()).notNull(),
  name: varchar('name').notNull(),
  qr_code: text('qr_code').notNull(),
  fields: integer('fields')
    .array()
    .notNull()
    .default(sql`ARRAY[]::integer[]`),
}