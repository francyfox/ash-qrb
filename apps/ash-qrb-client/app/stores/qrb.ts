import { api } from '~/libs/api'
import type { operations } from 'assets/schema'

type TQrbBody =
  operations['postSPrivateQrb']['requestBody']['content']['application/json']

type TQrbItems =
  operations['getSPrivateQrb']['responses']['200']['content']['application/json']['items']

export const useQrbStore = defineStore('qrb', () => {
  const qrbList = ref<TQrbItems>([])
  const errorMessage = ref()

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
    qrbList,
    getQrbList,
    postQrb,
  }
})
