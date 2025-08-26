import { APP_ENV__ } from '~/constants.ts'

const wsClient = new WebSocket(APP_ENV__.API_URL)
