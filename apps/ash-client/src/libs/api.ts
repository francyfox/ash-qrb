import createClient from 'openapi-fetch'
import type { paths } from '~/assets/schema'
import { APP_ENV__ } from '~/constants.ts'

export const api = createClient<paths>({
  baseUrl: APP_ENV__.API_URL,
})
