<script setup lang="ts">
import { computed } from 'vue'
import NuxtImg from "~/components/nuxt-image/NuxtImg.vue";
export interface IAvatarSquareProps {
  src?: string
  size?: 'xl' | 'md' | 'sm' | 'smx'
  placeholder?: string
}

const { placeholder = 'XX', size } = defineProps<IAvatarSquareProps>()

const imageSize = computed(() => {
  switch (size) {
    case 'xl':
      return { width: 144, height: 227 }
    case 'md':
      return { width: 120, height: 240 }
    case 'sm':
      return { width: 60, height: 80 }
    case 'smx':
      return { width: 30, height: 40 }
    default:
      return { width: 180, height: 260 }
  }
})
</script>

<template>
  <div class="avatar-sq flex border-1 rounded-xl border-p-middle-red bg-p-middle-red/20 shadow-xl"
       :style="`width: ${imageSize.width}px; height: ${imageSize.height}px`"
  >
    <NuxtImg
        v-bind="{
            src,
            width: imageSize.width,
            height: imageSize.height,
            alt: placeholder
          }"
        class="avatar-sq-picture-img"
        :custom="true"
        v-slot="{ isLoaded, imgAttrs }"
    >
      <img
          v-if="isLoaded"
          v-bind="imgAttrs"
          :src="src"
      />

      <USkeleton
          v-if="src && !isLoaded"
          class="w-full h-full"
      />

      <img
          v-if="!src"
          v-bind="imgAttrs"
          src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1746865825/ash-qrb/zwlt3zaqrzmptmvli7hz.jpg"
      />
    </NuxtImg>
  </div>
</template>

<style scoped lang="postcss">
.avatar-sq {
  :deep(img) {
    object-fit: contain;
  }
}
</style>