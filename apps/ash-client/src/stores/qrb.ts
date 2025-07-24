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

  const filter = reactive({
    search: '',
  })

  const pagination = reactive({
    pageIndex: 1,
    pageSize: 5,
    total: 0,
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

  const getQrbList = async () => {
    isLoading.qrbList = true
    const response = await api.GET('/s/private/qrb', {
      params: {
        query: {
          filter: JSON.stringify(filter),
          page: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
      },
    })

    const { data, error } = response

    pagination.total = data?.total ?? 0

    if (error) errorMessage.value = error
    qrbList.value = data?.items as any
    isLoading.qrbList = false

    return response
  }

  const postQrb = async (formData: TQrbBody) => {
    const response = await api.POST('/s/private/qrb', {
      body: formData,
    })

    const { error } = response

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

    const { error } = response

    if (error) errorMessage.value = error

    return response
  }

  return {
    isLoading,
    pagination,
    filter,
    errorMessage,
    qrb,
    qrbList,
    getQrbList,
    postQrb,
    getQrbById,
    updateQrb,
  }
})
