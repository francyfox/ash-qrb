import { ref } from 'vue'
import { api } from '~/libs/api.ts'

export const useQueueStore = defineStore('queue', () => {
  const list = ref([])
  const isLoading = ref(false)
  const errorMessage = ref()
  const total = ref(0)

  async function getTaskList({
    search,
    page,
    show,
  }: {
    search: string
    page: number
    show: string[]
  }) {
    isLoading.value = true

    const response = await api.GET('/s/private/queue', {
      params: {
        query: {
          filter: {
            search,
          },
          page,
          show,
        },
      },
    })

    const { data, error } = response

    if (data || error) isLoading.value = false
    if (error) errorMessage.value = error

    list.value = data.items
    total.value = data.total

    return response
  }

  async function removeTask(ids: string[]) {
    isLoading.value = true

    const response = await api.DELETE('/s/private/queue/bulk', {
      body: {
        ids,
      },
    })

    const { data, error } = response
    if (data || error) isLoading.value = false
    if (error) errorMessage.value = error

    return response
  }

  return {
    list,
    isLoading,
    getTaskList,
    removeTask,
  }
})
