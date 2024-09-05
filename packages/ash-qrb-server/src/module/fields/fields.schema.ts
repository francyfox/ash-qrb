import { pgEnum, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

const typeEnum = pgEnum('text', ['number', 'select', 'radio', 'switch', 'dialog'])

export const fieldsDefaultsColumns = {
  id: serial('id').primaryKey(),
  name: varchar('name'),
  type: typeEnum('text'),
  options: text('options'),
}

export const fieldsSchema = pgTable('fields', fieldsDefaultsColumns)