<script setup lang="ts">
import { storeToRefs } from 'pinia'
import QrbListActions from '~/components/forms/qrb-list/QrbListActions.vue'
import {
  defineAsyncComponent,
  onMounted,
  ref,
  resolveComponent,
  useTemplateRef,
} from 'vue'
import { watchDebounced } from '@vueuse/core'

definePage({
  meta: {
    layout: 'AdminPanel',
    auth: true,
  },
})

const ModalQrCode = defineAsyncComponent(
  () => import('~/components/modals/qrb-code/ModalQrCode.vue'),
)

const qrbStore = useQrbStore()
const { pagination, filter } = qrbStore
const { qrbList } = storeToRefs(qrbStore)
const modalQrCode = ref(false)
const qrbId = ref()

const toast = useToast()
const UDropdownMenu = resolveComponent('UDropdownMenu')

await qrbStore.getQrbList()

const providers = {
  toast,
  UDropdownMenu,
}

const handleEditQrb = (id: string) => {
  modalQrCode.value = true
  qrbId.value = id
}

const table = useTemplateRef('table')

onMounted(() => {
  if (table.value) {
    const { tableApi } = table.value.$refs.table
    const selectedRows = tableApi.getFilteredSelectedRowModel().rows
  }
})

watchDebounced(
  pagination,
  async () => {
    await qrbStore.getQrbList()
  },
  {
    debounce: 200,
    maxWait: 1000,
  },
)

watchDebounced(
  filter,
  async () => {
    await qrbStore.getQrbList()
  },
  {
    debounce: 500,
    maxWait: 1000,
  },
)
</script>

<template>
  <div class="w-full h-full relative h-full flex flex-col justify-between gap-5">
    <QrbListActions
        :list="qrbList"
        :disabled="qrbStore.isLoading.qrbList"
    />

    <QrbList
        ref="table"
        v-bind="{ providers }"
        v-model:filter="filter"
        v-model:pagination="pagination"
        :list="qrbList"
        :loading="qrbStore.isLoading.qrbList"
        @onEdit="handleEditQrb"
    />

    <ModalQrCode
        v-if="modalQrCode"
        v-model="modalQrCode"
        :id="qrbId"
    />
  </div>
</template>

<style scoped>

</style>