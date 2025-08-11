import { Packr } from 'msgpackr'

export interface IQueue {
  id: string
  value: string
  status: string
}

export const QUEUE_STATUS = {
  IN_QUEUE: 'IN_QUEUE',
  IN_PROGRESS: 'IN_PROGRESS',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
}

export class QueueModel {
  id
  value
  logs = ''
  status
  // packr

  constructor({ id, value, status }: IQueue) {
    // this.packr = new Packr()

    this.id = id
    this.value = value
    this.status = status || QUEUE_STATUS.IN_QUEUE
  }

  // get Value() {
  //   return this.packr.unpack(Buffer.from(this.value))
  // }
}
