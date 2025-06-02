<script setup lang="ts">
import NuxtImg from '~/components/nuxt-image/NuxtImg.vue'
defineProps<{
  src?: string
}>()
</script>

<template>
  <div class="qrb-image">
    <NuxtImg
        v-bind="$attrs"
        :src="src"
        :custom="true"
        v-slot="{ isLoaded, imgAttrs }"
    >
      <USkeleton
          v-if="!isLoaded"
          class="w-full h-full"
      />

      <img
          v-else
          v-bind="imgAttrs"
          :src="src"
      />
    </NuxtImg>
  </div>
</template>

<style scoped>

</style>