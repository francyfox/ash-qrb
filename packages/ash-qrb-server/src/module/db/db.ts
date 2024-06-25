import { drizzle } from 'drizzle-orm/xata-http'
import { getXataClient } from './db.xata'

const xata = getXataClient()
export const db = drizzle(xata)
