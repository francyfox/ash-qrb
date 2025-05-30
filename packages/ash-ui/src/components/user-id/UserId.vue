<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { id = 'unknown' } = defineProps<{
  id?: string
}>()

const toast = useToast()
const { copy, isSupported } = useClipboard()

const copyToast = () => {
  if (!isSupported) {
    toast.add({
      title: 'Your browser does not support Clipboard API',
      color: 'error',
    })
  }

  copy(id)

  toast.add({
    title: 'Copied to clipboard!',
    color: 'success',
  })
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
      <Icon
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