import { redisClient } from '@/core/services/redis.ts'
import { QUEUE_STATUS, QueueModel } from '@/modules/queue/queue.model.ts'
import { mergeStrip } from '@/utils/array.ts'
import type { RedisClient } from 'bun'

export class QueueService<T> {
  redisClient
  DEFAULT_PARAMS = {
    search: '*',
    limit: 10,
    offset: 0,
    returns: [],
  } as {
    search: string
    limit: number
    offset: number
    returns: (keyof Omit<QueueModel, 'validate'>)[]
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
        'FT.CREATE',
        'task_idx on HASH PREFIX 1 task: SCHEMA id TAG status TEXT logs TEXT value TEXT'.split(
          ' ',
        ),
      ),
    ])
  }

  async setItem(item: QueueModel) {
    await this.redisClient.hmset(
      `task:${item.id}`,
      mergeStrip(Object.keys(item), Object.values(item)),
    )
  }

  async removeItem(id: string) {
    await this.redisClient.del(`task:${id}`)
  }

  async updateItem(id: string, fields: Partial<Omit<QueueModel, 'id'>>) {
    const item = await this.getItem(id)

    if (!item) throw new Error('Item not found')

    await redisClient.hmset(
      `task:${id}`,
      mergeStrip(Object.keys(fields), Object.values(fields)),
    )
  }

  getItem(id: string) {
    const keys = Object.keys(new QueueModel({ id: '', value: '' }))
    return this.redisClient.hmget(`task:${id}`, keys)
  }

  async getAll({ search, limit, offset, returns } = this.DEFAULT_PARAMS) {
    const keys = await this.redisClient.keys('task:*')
    const total = keys.length // TODO: need replace on total results??
    const RETURN =
      returns.length > 0 ? `RETURN ${returns.length} ${returns.join(' ')}` : ''
    const args = `task_idx ${search} LIMIT ${offset} ${limit} ${RETURN}`
      .split(' ')
      .filter((i) => i)

    const { results: items } = await this.redisClient.send('FT.SEARCH', args)

    return {
      total,
      items,
    }
  }
}
