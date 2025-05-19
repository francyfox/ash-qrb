<script setup lang="ts">
const model = defineModel<boolean>()
const emit = defineEmits<{
  onSubmit: []
  onCancel: []
}>()

const { t } = useI18n()
</script>

<template>
  <LazyUModal v-model:open="model" :title="t('modalReallySure')">
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton
            color="primary"
            prepend-icon="i-lucide-chevron-right"
            @click="emit('onSubmit')"
        >
          {{ t('ok') }}
        </UButton>
      </div>
    </template>
  </LazyUModal>
</template>

<style scoped>

</style>