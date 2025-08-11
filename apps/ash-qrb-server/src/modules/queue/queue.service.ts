import { redisClient } from '@/core/services/redis.ts'
import { QUEUE_STATUS, type QueueModel } from '@/modules/queue/queue.model.ts'
import { Packr } from 'msgpackr'
import type { RedisClient } from 'bun'
import { join } from 'node:path'

export class QueueService {
  redisClient
  packr = new Packr()
  #worker: Worker = new Worker(join(import.meta.dir, './queue.worker.ts'))

  constructor(redisClient: RedisClient) {
    this.redisClient = redisClient
  }

  get worker(): Worker {
    return this.#worker
  }

  set worker(worker: Worker) {
    this.#worker = worker
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

  getAll(valuesOnly = false) {
    if (valuesOnly) return redisClient.hmget('task', ['value'])
    return redisClient.hmget('task', ['status', 'logs'])
  }

  getUnpackedValue(value: string) {
    return this.packr.unpack(Buffer.from(value))
  }

  register(id: string) {}
}
