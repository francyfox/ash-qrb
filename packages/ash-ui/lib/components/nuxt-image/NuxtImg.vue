<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { ref } from 'vue'

const { src = '', width, height, alt } = defineProps<{
  src?: string
  custom?: boolean
  width: number
  height: number
  alt: string
}>()

const options = ref({ src })

const { isLoading } = useImage(options)
</script>

<template>
  <div class="nuxt-image inline-flex">
    <slot v-if="isLoading" name="loading" />
    <img
        v-else
        v-bind="{ width, height, alt, src }"
        class="object-cover"
        loading="lazy"
    />
  </div>
</template>

<style scoped>

</style>