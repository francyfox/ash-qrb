import { swagger } from '@elysiajs/swagger'
import { ip } from 'elysia-ip'
import { rateLimit } from 'elysia-rate-limit'
export default function () {
  return [
    swagger(),
    ip({ checkHeaders: ['X-Forwarded-For', 'X-Real-IP'] }),
    rateLimit(),
  ]
}
