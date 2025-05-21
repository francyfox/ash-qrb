<script setup lang="ts">
import FormQr from '~/components/forms/qr/FormQr.vue'

const model = defineModel<boolean>()
const emit = defineEmits<{
  onSubmit: []
  onCancel: []
}>()

const { t } = useI18n()
</script>

<template>
  <LazyUModal
      v-model:open="model"
      :title="t('modalCreateQrTitle')"
      :ui="{ body: 'bg-(--color-s-champagne)' }"
  >
    <template #body>
      <FormQr />
    </template>
  </LazyUModal>
</template>

<style scoped>

</style>