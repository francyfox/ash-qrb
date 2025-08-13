import { redisClient } from '@/core/services/redis.ts'
import { QUEUE_STATUS, type QueueModel } from '@/modules/queue/queue.model.ts'
import { Packr } from 'msgpackr'
import type { RedisClient } from 'bun'
import { join } from 'node:path'

export class QueueService {
  redisClient
  packr = new Packr()

  constructor(redisClient: RedisClient) {
    this.redisClient = redisClient
  }

  setItem(item: QueueModel) {
    console.log(item)
    this.redisClient.hmset(`task:${item.id}`, [
      'status',
      QUEUE_STATUS.IN_QUEUE,
      'logs',
      item.logs,
      'value',
      item.value,
    ])
  }

  async updateItem(
    id: string,
    { status, logs }: Pick<QueueModel, 'status' | 'logs'>,
  ) {
    const item = await this.getItem(id)

    console.log(item)
    if (!item) throw new Error('Item not found')
    await redisClient.hmset(`task:${id}`, ['status', status, 'logs', logs])
  }

  getItem(id: string) {
    return this.redisClient.get(`task:${id}`)
  }

  getLastInQueue() {
    return this.redisClient.smembers('status:IN_QUEUE')
  }

  async getAll(keysOnly: boolean, fields: string[] = []) {
    const keys = await redisClient.keys('task:*')
    if (keysOnly) return keys

    return Promise.all(
      keys.map((key) => redisClient.hmget(`task:${key}`, fields)),
    )
  }

  getUnpackedValue(value: string) {
    return this.packr.unpack(Buffer.from(value))
  }

  register(id: string) {}
}
