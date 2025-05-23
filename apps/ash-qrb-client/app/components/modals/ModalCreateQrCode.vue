<script setup lang="ts">
import FormQr from '~/components/forms/qr/FormQr.vue'
import { useQrbStore } from '~/stores/qrb'

const toast = useToast()

const qrbStore = useQrbStore()
const { errorMessage } = storeToRefs(qrbStore)
const model = defineModel<boolean>()
const emit = defineEmits<{
  onSubmit: []
  onCancel: []
}>()

const { t } = useI18n()

const handleSubmit = async (v: any) => {
  const { error } = await qrbStore.postQrb({ qrb: v })

  if (error) {
    toast.add({
      title: error.message || 'error',
      description: error?.summary || error,
      color: 'error',
    })
  } else {
    toast.add({
      title: t('toastQrCreated'),
      color: 'success',
    })
  }

  model.value = false
}
</script>

<template>
  <LazyUModal
      v-model:open="model"
      :title="t('modalCreateQrTitle')"
      :ui="{ body: 'bg-(--color-s-champagne)' }"
  >
    <template #body>
      <FormQr
          @onSubmit="handleSubmit"
      />
    </template>
  </LazyUModal>
</template>

<style scoped>

</style>