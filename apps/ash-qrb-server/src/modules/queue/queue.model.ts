import { Value } from '@sinclair/typebox/value'
import { Type as t } from '@sinclair/typebox'

export const QUEUE_STATUS = {
  IN_QUEUE: 'IN_QUEUE',
  IN_PROGRESS: 'IN_PROGRESS',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
}

export const QueueSchema = t.Object({
  id: t.String(),
  status: t.Union([
    t.Literal(QUEUE_STATUS.IN_QUEUE),
    t.Literal(QUEUE_STATUS.FAILED),
    t.Literal(QUEUE_STATUS.SUCCESS),
    t.Literal(QUEUE_STATUS.IN_PROGRESS),
  ]),
  logs: t.String(),
  value: t.String(),
  createdAt: t.Number(),
  execStartAt: t.Union([t.Number(), t.Null()]),
  completedAt: t.Union([t.Number(), t.Null()]),
})

export type IQueue = typeof QueueSchema.static

export class QueueModel {
  id
  value
  logs = ''
  status = QUEUE_STATUS.IN_QUEUE
  createdAt
  execStartAt = null
  completedAt = null

  constructor({ id, value }: Pick<IQueue, 'id' | 'value'>) {
    this.id = id
    this.value = value
    this.createdAt = new Date().getTime()
    this.validate()
  }

  validate() {
    if (!Value.Check(QueueSchema, this)) {
      console.error([...Value.Errors(QueueSchema, this)])
      throw new Error('Error queue model validation')
    }

    return true
  }
}
