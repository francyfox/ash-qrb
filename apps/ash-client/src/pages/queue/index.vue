<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useQueueStore } from '~/stores/queue.ts'

definePage({
  meta: {
    layout: 'AdminPanel',
    auth: true,
  },
})

const queueStore = useQueueStore()
const { list, isLoading } = storeToRefs(queueStore)
const meta = ref({
  show: [],
  page: 1,
  search: '',
})

await queueStore.getTaskList(meta.value)

watchDebounced(
  meta,
  async () => {
    console.log('ss')
    await queueStore.getTaskList(meta.value)
  },
  {
    deep: true,
    debounce: 200,
    maxWait: 1000,
  },
)
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between gap-5">
    <QueueActions
        v-model:show="meta.show"
    />

    {{ meta }}

    <QueueTable
        :list="list"
        :loading="isLoading"
    />
  </div>
</template>

<style scoped>

</style>