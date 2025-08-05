// biome-ignore lint/style/noVar: <explanation>
import { db } from '@/core/db'
import { redisClient } from '@/core/services/redis.ts'
import { QueueService } from '@/modules/queue/queue.service.ts'
import { qrbSchema } from '@/schema/qrb.ts'

declare let self: Worker

const queueService = new QueueService(redisClient)

self.onmessage = async (event: MessageEvent) => {
  const list = await queueService.getAll()
  db.insert(qrbSchema).values([])
}
