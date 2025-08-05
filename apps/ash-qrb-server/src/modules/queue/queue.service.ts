import { redisClient } from '@/core/services/redis.ts'
import type { QueueModel } from '@/modules/queue/queue.model.ts'
import type { RedisClient } from 'bun'

export class QueueService {
  redisClient

  constructor(redisClient: RedisClient) {
    this.redisClient = redisClient
  }

  setItem(item: QueueModel) {
    this.redisClient.hmset(`task:${item.id}`, [
      'status',

      'value',
      item.value,
    ])
  }

  getItem(id: string) {
    return this.redisClient.get(`task:${id}`)
  }

  getAll() {
    return redisClient.mget('task')
  }

  register(id: string) {}
}
