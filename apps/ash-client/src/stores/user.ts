import type { operations } from 'assets/schema'
import { ref } from 'vue'
import type {
  IUserSingInDTO,
  TLoginProviders,
} from '~/components/forms/login/login.types'
import type { IUserSingUpDTO } from '~/components/forms/register/register.types'
import { api } from '~/libs/api'
import { authClient } from '~/libs/auth-client'

type TCloudinaryFile =
  operations['postSUpload']['responses']['200']['content']['application/json']['item']

export const useUserStore = defineStore('user', () => {
  const user = ref()
  const errorMessage = ref()

  const postFile = async (
    file: string & File,
    dir: 'images/' | 'json/' = 'images/',
  ): Promise<TCloudinaryFile | undefined> => {
    const { data, error } = await api.POST('/s/upload/', {
      body: {
        file,
        dir,
      },
      bodySerializer(body) {
        const fd = new FormData()
        for (const name in body) {
          fd.append(name, body[name])
        }
        return fd
      },
    })

    if (error) errorMessage.value = error

    return data?.item
  }

  const signIn = async (formData: IUserSingInDTO) => {
    const response = await authClient.signIn.email({
      email: 'test@example.com',
      password: 'password1234',
    })

    const { data, error } = response

    if (error) errorMessage.value = error
    user.value = data?.user

    return response
  }

  const signInProvider = async (provider: TLoginProviders) => {
    console.log(new URL('/dashboard', window.location.origin).toString())
    const response = await authClient.signIn.social({
      provider,
      callbackURL: new URL('/dashboard', window.location.origin).toString(),
    })

    const { data, error } = response
    if (error) errorMessage.value = error
    user.value = data?.user

    return response
  }

  const signUp = async (formData: IUserSingUpDTO) => {
    const { data, error } = await authClient.signUp.email({
      name: 'Francy Fox',
      companyName: 'test',
      image: 'https://media.tenor.com/iQAin82SBm8AAAAM/anime-megumin.gif',
      email: 'test@example.com',
      password: 'password1234',
    })

    if (error) errorMessage.value = error
    user.value = data
  }

  const signOut = async () => {
    const { error } = await authClient.signOut()

    if (error) errorMessage.value = error
  }

  return {
    user,
    postFile,
    errorMessage,
    signIn,
    signInProvider,
    signUp,
    signOut,
  }
})
