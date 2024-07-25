import { env } from '@root/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// for query purposes
const client = postgres(env.XATA_DB_PG_HOST, { max: 1 })
export const db = drizzle(client)
