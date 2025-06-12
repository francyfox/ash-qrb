import { ref } from 'vue'
import { api } from '~/libs/api'
import type { TQrbBody, TQrbItem, TQrbItems } from '~/types/qrb.types'

export const useQrbStore = defineStore('qrb', () => {
  const qrb = ref<TQrbItem>()
  const qrbList = ref<TQrbItems>([])
  const errorMessage = ref()

  const getQrbById = async (id: string) => {
    const response = await api.GET('/s/private/qrb/{id}', {
      params: {
        path: { id },
      },
    })

    const { data, error } = response
    if (error) errorMessage.value = error
    qrb.value = data?.item

    return response
  }

  const getQrbList = async (params: object) => {
    const response = await api.GET('/s/private/qrb', {
      params,
    })

    const { data, error } = response

    if (error) errorMessage.value = error
    qrbList.value = data?.items

    return response
  }

  const postQrb = async (formData: TQrbBody) => {
    const response = await api.POST('/s/private/qrb', {
      body: formData,
    })

    const { data, error } = response

    if (error) errorMessage.value = error

    return response
  }

  return {
    errorMessage,
    qrb,
    qrbList,
    getQrbList,
    postQrb,
    getQrbById,
  }
})
