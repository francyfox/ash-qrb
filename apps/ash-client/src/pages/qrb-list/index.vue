<script setup lang="ts">
import { storeToRefs } from 'pinia'
import QrbListActions from '~/components/forms/qrb-list/QrbListActions.vue'
import { defineAsyncComponent, ref, resolveComponent } from 'vue'

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
const { qrbList } = storeToRefs(qrbStore)
const modalQrCode = ref(false)
const qrbId = ref()

const toast = useToast()
const UDropdownMenu = resolveComponent('UDropdownMenu')

const { error } = await qrbStore.getQrbList({
  page: 1,
})

const providers = {
  toast,
  UDropdownMenu,
}

const handleEditQrb = (id: string) => {
  modalQrCode.value = true
  qrbId.value = id
}
</script>

<template>
  <div class="w-full h-full relative h-full flex flex-col justify-between gap-5">
    
    <QrbListActions
        :list="qrbList"
        :disabled="qrbStore.isLoading.qrbList"
    />

    <QrbList
        v-bind="{ providers }"
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