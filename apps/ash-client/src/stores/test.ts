import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestStore = defineStore('test', () => {
  const tt = ref('ggff')

  return {
    tt,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTestStore, import.meta.hot))
}
