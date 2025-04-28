import type { operations } from 'assets/schema'
import { api } from '~/libs/api'

type TCloudinaryFile =
  operations['postSUpload']['responses']['200']['content']['application/json']['item']

export const useUserStore = defineStore('user', () => {
  const config = useRuntimeConfig()
  const user = ref()
  const errorMessage = ref()

  const postFile = async (
    file: string & File,
  ): Promise<TCloudinaryFile | undefined> => {
    const { data, error } = await api.POST('/s/upload/', {
      body: {
        file,
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

  return {
    postFile,
  }
})
