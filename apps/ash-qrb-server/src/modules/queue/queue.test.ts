import { redisClient } from '@/core/services/redis.ts'
import { QueueModel } from '@/modules/queue/queue.model.ts'
import { QueueService } from '@/modules/queue/queue.service.ts'
import { Queue } from '@/modules/queue/queue.ts'
import { describe, expect, it } from 'bun:test'

const MOCK_TASK = {
  id: 'test',
  value: 'test',
}

describe('Queue', () => {
  it('create task', async () => {
    await Queue.service.setItem(MOCK_TASK)
    const item = await Queue.service.getItem('test')

    expect(JSON.stringify(item)).toBe(JSON.stringify(Object.values(MOCK_TASK)))
  })

  it('update task', async () => {
    await Queue.service.updateItem('test', {
      value: 'foo',
    })

    const item = await Queue.service.getItem('test')
    expect(item.includes('foo')).toBe(true)
  })

  it('return all tasks', async () => {
    const { items } = await Queue.service.getAll()
    const match = items.some((i: any) => i.id === 'task:test')

    expect(match).toBe(true)
  })

  it('status filter', async () => {
    await Queue.service.updateItem('test', {
      status: 'FAILED',
    })

    const { items } = await Queue.service.getAll({
      search: '@status:FAILED',
      offset: 0,
      limit: 10,
      returns: ['value', 'status'],
    })

    expect(items.some((i: any) => i.extra_attributes.status !== 'FAILED')).toBe(
      false,
    )
  })

  it('remove task', async () => {
    await Queue.service.removeItem('test')
    const item = await Queue.service.getItem('test')
    expect(item.filter((v) => v).length === 0).toBe(true)
  })
})
