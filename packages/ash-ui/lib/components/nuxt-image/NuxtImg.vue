<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { ref } from 'vue'

const { src = '', custom } = defineProps<{
  src?: string
  custom?: boolean
  width: number
  height: number
  alt: string
}>()

const options = ref()
options.value = { src }

const { isLoading, error } = useImage(options)
</script>

<template>
  <div class="nuxt-image inline-flex">
    <slot v-if="isLoading" name="loading" />
    <img
        v-else
        v-bind="{ width, height, alt, src }"
        loading="lazy"
    />

    <span
        v-if="error"
        class="absolute flex w-full h-full justify-center items-center top-0 left-0  p-2 text-white text-xs bg-amber-900 rounded-xl"
    >
      Error... <br>
      Cant load image {{ alt }}
    </span>
  </div>
</template>

<style scoped>

</style>