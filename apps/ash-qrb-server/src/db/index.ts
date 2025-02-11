import { config } from '@/config.ts'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

export const client = new Client({
  connectionString: config.DATABASE_URL,
})

export const db = drizzle(client, {
  casing: 'snake_case',
})
