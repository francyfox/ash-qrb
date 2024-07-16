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
  body: { phone: string }
  error: (status: number, message: string) => void
  response: unknown | undefined
}
export type ElysiaHandler = (params: ElysiaHandlerParameters) => void
