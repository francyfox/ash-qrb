<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { id = 'unknown' } = defineProps<{
  id?: string
}>()

const { copy, isSupported } = useClipboard()
const emit = defineEmits<{
  onUnsupported: []
  onSuccess: []
}>()

const copyToast = () => {
  if (!isSupported) {
    emit('onUnsupported')
  }

  copy(id)

  emit('onSuccess')
}
</script>

<template>
  <UTooltip text="Click to copy your id">
    <UButton
        v-if="id"
        type="button"
        size="xs"
        @click="copyToast"
    >
      <UIcon
          name="i-lucide-link"
          :width="16"
          :height="16"
      />
      User ID:

      <span class="overflow-ellipsis overflow-hidden whitespace-nowrap w-[80px]">
        {{ id }}
      </span>
    </UButton>
  </UTooltip>
</template>

<style scoped>

</style>