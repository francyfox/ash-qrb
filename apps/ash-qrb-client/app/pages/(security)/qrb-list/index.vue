<script setup lang="ts">
import ModalCreateQrCode from '~/components/modals/ModalCreateQrCode.vue'
import ModalReallySure from '~/components/modals/ModalReallySure.vue'
import QrbList from '~/components/ui/table/QrbList.vue'

definePageMeta({
  middleware: ['auth'],
})

const { t } = useI18n()

const qrbStore = useQrbStore()
const { qrbList } = storeToRefs(qrbStore)

const modalReallySure = ref(false)
const modalQrCode = ref(false)

const { error } = await qrbStore.getQrbList({
  page: 1,
})
</script>

<template>
  <NuxtLayout name="admin-panel">
    <div class="relative z-10 h-full flex flex-col justify-between gap-5">
      <div class="flex gap-2">
        <UButton
            color="primary"
            type="button"
            class="cursor-pointer"
            icon="i-lucide-qr-code"
            @click="modalQrCode = true"
        >
          {{ t('qrbListAdd') }}
        </UButton>

        <UButton
            color="error"
            type="button"
            class="cursor-pointer"
            icon="i-lucide-trash-2"
            @click="modalReallySure = true"
        >
          {{ t('qrbListRemoveSelected') }}
        </UButton>
      </div>

      <QrbList :list="qrbList" />
    </div>

    <ModalReallySure
        v-model="modalReallySure"
        @onSubmit=""
        @onClose=""
    />

    <ModalCreateQrCode
        v-model="modalQrCode"
    />
  </NuxtLayout>
</template>

<style scoped>

</style>