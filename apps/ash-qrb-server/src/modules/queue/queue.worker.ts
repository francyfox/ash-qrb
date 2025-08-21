import { db } from '@/core/db'
import { redisClient } from '@/core/services/redis.ts'
import { QueueModel } from '@/modules/queue/queue.model.ts'
import { QueueService } from '@/modules/queue/queue.service.ts'
import { qrbSchema } from '@/schema/qrb.ts'

declare let self: Worker

const queueService = new QueueService(redisClient)

self.onmessage = async (event: MessageEvent) => {
  const { filename, file } = event.data

  queueService.setItem(
    new QueueModel({
      id: filename,
      value: file,
    }),
  )

  const { items, total } = await queueService.getAll({
    search: '@status:IN_QUEUE',
    offset: 0,
    limit: 1000,
  })

  for (const item of items) {
  }
  // const values = list
  //   .filter((i) => i)
  //   .map((i) => queueService.getUnpackedValue(i as string))

  self.postMessage(list)
  // db.insert(qrbSchema).values(values)
}
