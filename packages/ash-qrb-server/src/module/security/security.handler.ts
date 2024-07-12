import {
  createUser,
  getUserByPhone,
} from '@root/module/security/security.repository'
import type { ElysiaHandler } from '@root/module/security/security.types'
export const handlerSignIn: ElysiaHandler = async ({
  jwt,
  cookie: { auth },
  body,
  error,
}) => {
  const user = await getUserByPhone({ body, error })
  auth.set({
    value: await jwt.sign(user),
    httpOnly: true,
    maxAge: 7 * 86400,
    path: '/profile',
  })

  // @ts-ignore
  return auth.jar.auth
}

export const handlerSignUp: ElysiaHandler = async ({
  body,
  error,
  jwt,
  cookie: { auth },
}) => {
  const user = await createUser({ body, error })

  console.log(user)

  auth.set({
    value: await jwt.sign(user),
    httpOnly: true,
    maxAge: 7 * 86400,
    path: '/profile',
  })

  return { item: user }
}
export const handlerSignOut: ElysiaHandler = async ({ cookie, set }) => {
  try {
    // @ts-ignore
    cookie?.auth?.remove()
  } catch (error) {
    set.status = 500
    return error
  }

  return 'Cookie auth removed'
}
export const handlerProfile: ElysiaHandler = async ({
  jwt,
  set,
  cookie: { auth },
}) => {
  const profile = await jwt.verify(auth.value)

  if (!profile) {
    set.status = 401
    return 'Unauthorized'
  }

  return profile
}
