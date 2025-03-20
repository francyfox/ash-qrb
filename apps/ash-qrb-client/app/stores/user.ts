import { api } from "~/libs/api";

export const useUserStore = defineStore('user', () => {
  const config = useRuntimeConfig()
  const user = ref()
  const errorMessage = ref()

  const postFile = async (file: File) => {
    const { data, error } = await api.upload.post({
      body: file,
    })

    if(error) errorMessage.value = error

    console.log(data)
  }

  return {
    postFile,
  }
})