import { config } from '@/config.ts'
import { RedisClient } from 'bun'
import { join } from 'node:path'

const CERT_FOLDER = join(process.cwd(), '../../docker/certs/redis')
console.log(join(CERT_FOLDER, './ca.crt'))

export const redisClient = new RedisClient('redis://default:123@0.0.0.0:6379', {
  tls: {
    ca: join(CERT_FOLDER, './ca.crt'),
    cert: join(CERT_FOLDER, './client.crt'),
    key: join(CERT_FOLDER, './client.key'),
  },
})

redisClient.onconnect = () => {
  console.log('Connected to Redis server')
}

redisClient.onclose = (error) => {
  console.error('Disconnected from Redis server:', error)
}
