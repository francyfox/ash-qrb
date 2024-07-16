import { ENV } from '@root/env'
import type { components, paths } from 'openapi-dts/openapi/api'
import createClient from 'openapi-fetch'
const ApiClient = createClient<paths>({ baseUrl: `${ENV.NEXT_API_URL}` })
export default ApiClient
