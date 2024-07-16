import { pino } from '@bogeychan/elysia-logger'
import pc from 'picocolors'
import pretty from 'pino-pretty'

export const relativeURL = (string_: string): string =>
  string_.replace(/^(?:\/\/|[^/]+)*/, '')
export const stream = pretty({
  colorize: true,
  translateTime: 'SYS:standard',
  hideObject: true,
  ignore: 'req,res,responseTime',
  messageFormat: (log) => {
    const { request, msg } = log as { request: Request; msg: string }
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const time = +(log as any).responseTime
    let coloredTime = `${time.toString()} ms`

    if (time < 3) {
      coloredTime = pc.green(coloredTime)
    } else if (time > 3 && time < 6) {
      coloredTime = pc.yellow(coloredTime)
    } else {
      coloredTime = pc.red(coloredTime)
    }

    return request
      ? `[${pc.yellow(request.method)}] - ${relativeURL(request.url)}  - ${coloredTime}`
      : `${msg}`
  },
  customPrettifiers: {
    time: (timestamp) =>
      `🕰 ${typeof timestamp === 'string' ? timestamp : 'no-time'}`,
    // @ts-ignore
    pid: (pid: number) => pc.dim(pid),
    hostname: () => '',
  },
})

export const log = pino(stream)
