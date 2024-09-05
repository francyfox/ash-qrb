import { BAD_REQUEST, ERROR_UNAUTHORIZED, INTERNAL } from '@root/core/module/error/error.const';
import { createUser, getUserByPhone } from '@root/module/security/security.repository'
import type { ElysiaHandler } from '@root/module/security/security.types'

export const handlerSignIn: ElysiaHandler = async ({
  jwt,
  cookie: { auth },
  body,
  error,
}) => {
  const { password } = body
  const user = await getUserByPhone({ body, error })
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const valid = await Bun.password.verify(password, (user as any).password)

  if (!valid) {
    return error('400', {
      name: BAD_REQUEST,
      message: 'Bad auth. Wrong password'
    })
  }

  auth.set({
    value: await jwt.sign(user),
    httpOnly: true,
    maxAge: 7 * 86400,
    path: '/profile',
  })

  return { message: 'Authorized' }
}

export const handlerSignUp: ElysiaHandler = async ({
  body,
  error,
  jwt,
  cookie: { auth },
}) => {
  const user = await createUser({ body, error })

  auth.set({
    value: await jwt.sign(user),
    httpOnly: true,
    maxAge: 7 * 86400,
    path: '/profile',
  })

  return { item: user }
}
export const handlerSignOut: ElysiaHandler = async ({ error, cookie }) => {
  try {
    // @ts-ignore
    cookie?.auth?.remove()
  } catch (e) {
    return error('500', {
      name: INTERNAL,
      message: 'Cant remove cookie'
    })
  }

  return {
    message: 'Cookie auth removed'
  }
}
export const handlerProfile: ElysiaHandler = async ({
  jwt,
  set,
  error,
  cookie: { auth },
}) => {
  const profile = await jwt.verify(auth.value)

  if (!profile) return error('401', ERROR_UNAUTHORIZED)

  return profile
}
