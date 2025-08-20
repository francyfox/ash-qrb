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
})

export interface IQueue {
  id: string
  value: string
  status: string
}

export class QueueModel {
  id
  value
  logs = ''
  status = QUEUE_STATUS.IN_QUEUE

  constructor({ id, value }: Omit<IQueue, 'status'>) {
    this.id = id
    this.value = value
    this.validate()
  }

  validate() {
    if (!Value.Check(QueueSchema, this))
      throw new Error(
        JSON.stringify([...Value.Errors(QueueSchema, this)], null, 2),
      )
    return true
  }
}
