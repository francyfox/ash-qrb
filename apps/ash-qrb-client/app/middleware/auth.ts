import { authClient } from '~/libs/auth-client'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.useSession(useFetch)
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  if (!session.value) {
    return navigateTo('/auth')
  }

  console.log(session.value)
  user.value = session.value.user
})
