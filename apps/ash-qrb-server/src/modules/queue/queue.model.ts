import { Packr } from 'msgpackr'

export interface IQueue {
  id: string
  value: string
}

export const QUEUE_STATUS = {
  IN_QUEUE: 0,
  IN_PROGRESS: 1,
  FAILED: 2,
  SUCCESS: 3,
}

export class QueueModel {
  id
  value
  log = ''
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
