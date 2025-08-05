import { RedisClient } from 'bun'
import { Elysia } from 'elysia'

export const redisClient = new RedisClient(
  'redis://default:123@localhost:6379',
  {
    // connectionTimeout: 1000,
    // autoReconnect: true,
    // maxRetries: 1,
    // enableAutoPipelining: true,
    tls: {
      rejectUnauthorized: true, // TODO: bun:bug default cyphers in next bun release
      // ca: join(CERT_FOLDER, './ca.crt'),
      // cert: join(CERT_FOLDER, './client.crt'),
      // key: join(CERT_FOLDER, './client.key'),
    },
  },
)

export const elysiaRedis = new Elysia().decorate('redis', RedisClient)

redisClient.onconnect = () => {
  console.log('🪣  Redis was connected!')
}

redisClient.onclose = (error) => {
  console.error('🪣 Disconnected from Redis server:', error)
}
