import { redisClient } from '@/core/services/redis.ts'
import { QUEUE_STATUS, type QueueModel } from '@/modules/queue/queue.model.ts'
import { Packr } from 'msgpackr'
import type { RedisClient } from 'bun'
import { join } from 'node:path'

export class QueueService {
  redisClient
  DEFAULT_PARAMS = {
    limit: 10,
    offset: 0,
  }

  constructor(redisClient: RedisClient) {
    this.redisClient = redisClient
    ;(async () => {
      await this.createIndexes()
    })()
  }

  async createIndexes() {
    const indexes = ['upload_idx']
    const dbIndexes: string[] = await this.redisClient.send('FT._LIST', [])
    const hasIndexes = dbIndexes.includes(indexes.join('|'))

    if (hasIndexes) return

    return Promise.all([
      this.redisClient.send(
        'FT.CREATE upload_idx on HASH PREFIX 1 upload: SCHEMA checksum TAG value TEXT',
        [],
      ),
    ])
  }

  setItem(item: QueueModel) {
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

  async getAll(keysOnly: boolean, { limit, offset } = this.DEFAULT_PARAMS) {
    const keys = await redisClient.send(
      `SCAN 0 MATCH task:* COUNT ${limit}`,
      [],
    )
    if (keysOnly) return keys

    return this.redisClient.send(
      `FT.SEARCH upload_idx "*" LIMIT ${offset} ${limit}`,
      [],
    )
  }

  register(id: string) {}
}
