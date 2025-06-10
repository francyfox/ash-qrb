import { useFetch } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { authClient } from '~/libs/auth-client'
import type { RouteMiddleware } from '~/types/route.types.ts'

// @ts-ignore-next-line
export const authMiddleware: RouteMiddleware = async (to, from, next) => {
  if (to.meta?.auth) {
    const { data: session } = await authClient.useSession(useFetch)
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    if (!session.value || (session.value as unknown as string) === 'null') {
      next('auth')
    }

    user.value = JSON.parse(session.value as unknown as string)?.user
  }

  next()
}
