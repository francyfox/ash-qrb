import { config } from '@/config.ts'
import { CERT_DIR } from '@/consts.ts'
import { RedisClient } from 'bun'
import { Elysia } from 'elysia'
import { join } from 'node:path'

export const redisClient = new RedisClient(
  `redis://${config.REDIS_USER}:${config.REDIS_PASSWORD}@${config.REDIS_HOST}:${config.REDIS_PORT}`,
  {
    // connectionTimeout: 1000,
    // autoReconnect: true,
    // maxRetries: 1,
    // enableAutoPipelining: true,
    // tls: {
    //   rejectUnauthorized: true, // TODO: bun:bug default cyphers in next bun release
    //   ca: join(CERT_DIR, './ca.crt'),
    //   cert: join(CERT_DIR, './client.crt'),
    //   key: join(CERT_DIR, './client.key'),
    // },
  },
)

export const elysiaRedis = new Elysia().decorate('redis', redisClient)

redisClient.onconnect = () => {
  console.log('🪣  Redis was connected!')
}

redisClient.onclose = (error) => {
  console.error('🪣 Disconnected from Redis server:', error)
}
