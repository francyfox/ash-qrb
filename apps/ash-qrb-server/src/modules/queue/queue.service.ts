import { redisClient } from '@/core/services/redis.ts'
import { QUEUE_STATUS, type QueueModel } from '@/modules/queue/queue.model.ts'
import { Packr } from 'msgpackr'
import type { RedisClient } from 'bun'
import { join } from 'node:path'

export class QueueService {
  redisClient
  DEFAULT_PARAMS = {
    search: '*',
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
    const indexes = ['task_idx']
    const dbIndexes: string[] = await this.redisClient.send('FT._LIST', [])
    const hasIndexes = dbIndexes.includes(indexes.join('|'))

    if (hasIndexes) return

    return Promise.all([
      this.redisClient.send(
        'FT.CREATE task_idx on HASH PREFIX 1 task: SCHEMA id TAG status TEXT logs TEXT value TEXT',
        [],
      ),
    ])
  }

  setItem(item: QueueModel) {
    this.redisClient.hmset(`task:${item.id}`, [
      'id',
      item.id,
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

  async getAll({ search, limit, offset } = this.DEFAULT_PARAMS) {
    const keys = await this.redisClient.keys('task:')
    const total = keys.length
    return {
      total,
      items: await this.redisClient.send(
        `FT.SEARCH task_idx "${search}" LIMIT ${offset} ${limit}`,
        [],
      ),
    }
  }

  register(id: string) {}
}
