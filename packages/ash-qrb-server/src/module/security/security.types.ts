import type { Auth } from 'lucia'

interface ElysiaHandlerParameters {
  jwt: {
    sign: (payload: unknown) => Promise<string>
    verify: (token: string) => Promise<unknown> | undefined
  }
  cookie: {
    auth: {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      value: any
      set: (options: {
        value: string
        httpOnly: boolean
        maxAge: number
        path: string
      }) => void
    }
  }
  set: { status: number }
  params: unknown | undefined
  body: { phone: string; password: string }
  error: (status: string | number, message: string | object) => void
  response: unknown | undefined
  user: Auth
}
export type ElysiaHandler = (params: ElysiaHandlerParameters) => void
