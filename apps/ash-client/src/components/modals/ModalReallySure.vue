<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const model = defineModel<boolean>()
const emit = defineEmits<{
  onSubmit: []
  onCancel: []
}>()

const { t } = useI18n()
</script>

<template>
  <UModal v-model:open="model" :title="t('modalReallySure')">
    <template #footer>
      <div class="w-full flex justify-center gap-2">
        <UButton
            color="primary"
            size="xl"
            prepend-icon="i-lucide-chevron-right"
            class="w-full max-w-1/2"
            @click="emit('onSubmit')"
        >
          <span class="w-full text-center">{{ t('ok') }}</span>
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<style scoped>

</style>