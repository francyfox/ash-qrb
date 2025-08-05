import { Packr } from 'msgpackr'

export interface IQueue {
  id: string
  value: string
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
  status = QUEUE_STATUS.IN_QUEUE
  packr

  constructor({ value }: IQueue) {
    this.packr = new Packr()

    this.id = new Date().getTime()
    this.value = this.packr.pack(value).toString()
  }

  // get Value() {
  //   return this.packr.unpack(Buffer.from(this.value))
  // }
}
