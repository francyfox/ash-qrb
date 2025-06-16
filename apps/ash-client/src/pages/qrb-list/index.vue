<script setup lang="ts">
import { storeToRefs } from 'pinia'
import QrbListActions from '~/components/forms/qrb-list/QrbListActions.vue'

definePage({
  meta: {
    layout: 'AdminPanel',
    auth: true,
  },
})

const qrbStore = useQrbStore()
const { qrbList } = storeToRefs(qrbStore)

const { error } = await qrbStore.getQrbList({
  page: 1,
})
</script>

<template>
  <div class="w-full h-full relative h-full flex flex-col justify-between gap-5">
    
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