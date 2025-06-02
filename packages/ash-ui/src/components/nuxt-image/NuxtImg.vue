<script setup lang="ts">
import { useImage } from '@vueuse/core'

const { src = '', custom } = defineProps<{
  src?: string,
  custom?: boolean,
  width: number,
  height: number,
  alt: string
}>()

const { isLoading } = useImage({ src })
</script>

<template>
  <div class="nuxt-image">
    <slot
        v-if="custom"
        :isLoaded="isLoading"
        :imgAttrs="{...$attrs, width, height, alt }"
    />

    <img
        v-bind="{...$attrs, width, height, alt }"
        :src="src"
        loading="lazy"
    />
  </div>
</template>

<style scoped>

</style>