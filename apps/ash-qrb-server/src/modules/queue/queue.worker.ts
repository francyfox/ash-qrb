import { db } from '@/core/db'
import { redisClient } from '@/core/services/redis.ts'
import { QueueService } from '@/modules/queue/queue.service.ts'
import { qrbSchema } from '@/schema/qrb.ts'

declare let self: Worker

const queueService = new QueueService(redisClient)

self.onmessage = async (event: MessageEvent) => {
  const list = await queueService.getAll(true)
  const values = list
    .filter((i) => i)
    .map((i) => queueService.getUnpackedValue(i as string))

  console.log(values)
  // db.insert(qrbSchema).values(values)
}
