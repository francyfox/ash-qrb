import type { paths } from '@/assets/schema'
import createClient from 'openapi-fetch'
import { config } from '~~/config'

export const api = createClient<paths>({
  baseUrl: config.API_URL,
})
