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
          filter: JSON.stringify(filter) as any,
          page: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
      },
    })

    const { data, error } = response

    if (data || error) isLoading.qrbList = false

    pagination.total = data?.total ?? 0

    if (error) errorMessage.value = error
    qrbList.value = data?.items as any
    console.log(data?.items)

    return response
  }

  const postQrb = async (formData: TQrbBody) => {
    isLoading.qrbList = true

    const response = await api.POST('/s/private/qrb', {
      body: formData,
    })

    const { data, error } = response

    if (data || error) isLoading.qrbList = false

    if (error) errorMessage.value = error

    return response
  }

  const updateQrb = async (id: string, formData: TQrbBody) => {
    isLoading.qrbList = true

    const response = await api.PATCH('/s/private/qrb/{id}', {
      params: {
        path: { id },
      },
      body: formData,
    })

    const { data, error } = response
    if (data || error) isLoading.qrbList = false

    if (error) errorMessage.value = error

    return response
  }

  const removeManyQrb = async (ids: string[]) => {
    isLoading.qrbList = true

    const response = await api.DELETE('/s/private/qrb/bulk', {
      body: {
        ids,
      },
    })

    const { data, error } = response
    if (data || error) isLoading.qrbList = false
    if (error) errorMessage.value = error

    return response
  }

  const updateManyQrb = async (ids: string[], fields: any) => {
    isLoading.qrbList = true

    const response = await api.PATCH('/s/private/qrb/bulk', {
      body: {
        ids,
        fields,
      },
    })

    const { data, error } = response
    if (data || error) isLoading.qrbList = false
    if (error) errorMessage.value = error

    return response
  }

  const importQrb = async (file: File) => {
    const response = await api.POST('/s/private/qrb/json', {
      body: {
        file,
      },
    })

    return response
  }

  const exportQrb = async () => {
    const response = await api.GET('/s/private/qrb/json', {
      parseAs: 'blob',
    })

    const { data } = await response

    if (!data) throw new Error('File is undefined')
    const file = window.URL.createObjectURL(data)
    const link: HTMLAnchorElement = document.createElement('a')
    link.href = file
    link.download = `qrb_exports_${new Date().getTime()}` // the default filename when the user saves the file
    link.click()

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
    updateManyQrb,
    removeManyQrb,
    importQrb,
    exportQrb,
  }
})
