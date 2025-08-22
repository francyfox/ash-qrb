import { redisClient } from '@/core/services/redis.ts'
import { QueueService } from '@/modules/queue/queue.service.ts'

const service = new QueueService(redisClient)

export const Queue = {
  service,
}
