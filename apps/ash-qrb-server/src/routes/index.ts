import type { ElysiaApp } from '@/server.ts'

export default (app: ElysiaApp) => app.get('/', 'hello world')
