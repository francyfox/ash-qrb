import { useFetch } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { authClient } from '~/libs/auth-client'
import type { RouteMiddleware } from '~/types/route.types.ts'

export const authMiddleware: RouteMiddleware = async (to, from, next) => {
  if (!to.meta?.auth) next()

  const { data: session } = await authClient.useSession(useFetch)
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  if (!session.value) {
    return { name: 'auth' }
  }

  user.value = session.value.user
}
