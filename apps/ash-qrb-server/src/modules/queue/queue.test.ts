import { redisClient } from '@/core/services/redis.ts'
import { QueueModel } from '@/modules/queue/queue.model.ts'
import { QueueService } from '@/modules/queue/queue.service.ts'
import { describe, expect, it } from 'bun:test'

const MOCK_TASK = new QueueModel({
  id: 'test',
  value: 'test',
})

describe('Queue', () => {
  const service = new QueueService(redisClient)
  it('create task', async () => {
    await service.setItem(MOCK_TASK)

    expect(await service.getItem('test')).toBe(Object.values(MOCK_TASK))
  })

  it('update task', async () => {
    await service.updateItem('test')
  })

  it('remove task', async () => {
    await service.removeItem('test')
    const item = await service.getItem('test')
    console.log(item)
    expect(item).toBe([null])
  })

  it('return all tasks', async () => {
    const result = await service.getAll()
  })
})
