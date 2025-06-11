<script setup lang="ts">
import QrbListActions from '~/components/forms/qrb-list/QrbListActions.vue'
import ModalCreateQrCode from '~/components/modals/ModalCreateQrCode.vue'
import ModalReallySure from '~/components/modals/ModalReallySure.vue'
import QrbList from '~/components/ui/table/QrbList.vue'

definePageMeta({
  middleware: ['auth'],
})

const qrbStore = useQrbStore()
const { qrbList } = storeToRefs(qrbStore)

const { error } = await qrbStore.getQrbList({
  page: 1,
})
</script>

<template>
  <NuxtLayout name="admin-panel">
    <div class="relative h-full flex flex-col justify-between gap-5">
      <QrbListActions
          :list="qrbList"
      />

      <QrbList
          :list="qrbList"
      />
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>