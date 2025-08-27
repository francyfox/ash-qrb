import { PROJECT_DIR } from '@/consts.ts'
import { db } from '@/core/db'
import { redisClient } from '@/core/services/redis.ts'
import { QUEUE_STATUS, QueueModel } from '@/modules/queue/queue.model.ts'
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
    returns: ['id', 'value'],
  })

  for (const item of items) {
    await queueService.updateItem(item.id, {
      status: QUEUE_STATUS.IN_PROGRESS,
      execStartAt: new Date().getTime(),
    })

    try {
      const buffer = await Bun.file(`${PROJECT_DIR}${item.value}`).arrayBuffer()
      const decompressed = Bun.gunzipSync(buffer)
      const decoder = new TextDecoder()
      const content = decoder.decode(decompressed)

      const json = JSON.parse(content)
      console.log(json)
      await db.insert(qrbSchema).values(json.items)

      await queueService.updateItem(item.id, {
        status: QUEUE_STATUS.SUCCESS,
        completedAt: new Date().getTime(),
      })

      self.postMessage(json)
    } catch (e) {
      console.log(e)
      const error = e as Error

      await queueService.updateItem(item.id, {
        status: QUEUE_STATUS.FAILED,
        completedAt: new Date().getTime(),
        logs: JSON.stringify(error),
      })

      throw new Error(error.message)
    }
  }
  // const values = list
  //   .filter((i) => i)
  //   .map((i) => queueService.getUnpackedValue(i as string))

  // self.postMessage(list)
  // db.insert(qrbSchema).values(values)
}
