<route lang="yaml">
meta:
  layout: AdminPanel
  auth: true
</route>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import QrbListActions from '~/components/forms/qrb-list/QrbListActions.vue'

const qrbStore = useQrbStore()
const { qrbList } = storeToRefs(qrbStore)

const { error } = await qrbStore.getQrbList({
  page: 1,
})
</script>

<template>
  <div class="relative h-full flex flex-col justify-between gap-5">
    <QrbListActions
        :list="qrbList"
    />

    <QrbList
        :list="qrbList"
    />
  </div>
</template>

<style scoped>

</style>