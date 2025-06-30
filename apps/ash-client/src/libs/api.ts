import createClient from 'openapi-fetch'
import type { paths } from '~/assets/schema'

export const api = createClient<paths>({
  baseUrl: '',
})
