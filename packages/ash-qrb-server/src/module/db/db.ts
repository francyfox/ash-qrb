import { getXataClient } from '@root/xata'
import { drizzle } from 'drizzle-orm/xata-http'

const xata = getXataClient()
export const db = drizzle(xata)
