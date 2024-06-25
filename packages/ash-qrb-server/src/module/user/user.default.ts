import { generateId } from '@root/utils'
import { char, pgTable, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').default(generateId()),
  fullName: char('fullName', { length: 50 }),
  phone: char('phone', { length: 18 }),
})
