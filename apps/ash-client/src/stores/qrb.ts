import { reactive, ref } from 'vue'
import { api } from '~/libs/api'
import type { TQrbBody, TQrbItem, TQrbItems } from '~/types/qrb.types'

export const useQrbStore = defineStore('qrb', () => {
  const qrb = ref<TQrbItem>()
  const qrbList = ref<TQrbItems>([])
  const errorMessage = ref()
  const isLoading = reactive({
    qrbList: false,
    qrb: false,
  })

  const getQrbById = async (id: string) => {
    isLoading.qrb = true

    const response = await api.GET('/s/private/qrb/{id}', {
      params: {
        path: { id },
      },
    })

    const { data, error } = response
    if (error) errorMessage.value = error
    qrb.value = data?.item
    isLoading.qrb = false

    return response
  }

  const getQrbList = async (params: object) => {
    isLoading.qrbList = true
    const response = await api.GET('/s/private/qrb', {
      params,
    })

    const { data, error } = response

    if (error) errorMessage.value = error
    qrbList.value = data?.items
    isLoading.qrbList = false

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

  const updateQrb = async (id: string, formData: TQrbBody) => {
    const response = await api.PATCH('/s/private/qrb/{id}', {
      params: {
        path: { id },
      },
      body: formData,
    })

    const { data, error } = response

    if (error) errorMessage.value = error

    return response
  }

  return {
    isLoading,
    errorMessage,
    qrb,
    qrbList,
    getQrbList,
    postQrb,
    getQrbById,
    updateQrb,
  }
})
