import createClient from 'openapi-fetch'
import { config } from '~~/config'
import type { paths } from './qrb-schema'

export const api = createClient<paths>({
  baseUrl: config.API_URL,
})
