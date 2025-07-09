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
</template>

<style scoped>

</style>