import { Queue } from '@/modules/queue/queue.ts'
import { describe, expect, it } from 'bun:test'

const MOCK_TASK = {
  id: 'test',
  value: 'test',
}

describe('Queue', () => {
  it('create task', async () => {
    await Queue.service.setItem(MOCK_TASK)
    const [id, value] = await Queue.service.getItem('test')
    const isEqual = MOCK_TASK.id === id && MOCK_TASK.value === value

    expect(isEqual).toBe(true)
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
    const match = items.some((i: any) => i.id === 'test')

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

    expect(items.some((i: any) => i.status !== 'FAILED')).toBe(false)
  })

  it('remove task', async () => {
    await Queue.service.removeItem('test')
    const item = await Queue.service.getItem('test')
    expect(item.filter((v) => v).length === 0).toBe(true)
  })
})
