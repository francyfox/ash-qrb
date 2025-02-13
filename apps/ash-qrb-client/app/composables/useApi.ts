import { treaty } from '@elysiajs/eden/treaty2'
import type { ElysiaApp } from 'ash-qrb-server'

export default function () {
  const app = treaty<ElysiaApp>('')
}
