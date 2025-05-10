<script setup lang="ts">
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
    <NuxtPicture
      v-bind="{
        src,
        width: imageSize.width,
        height: imageSize.height
      }"
      format="avif,webp"
      class="avatar-sq-picture flex"
      v-slot="{ isLoaded }"
    >
      <NuxtImg
          v-if="!isLoaded"
          src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1746865825/ash-qrb/zwlt3zaqrzmptmvli7hz.jpg"
          v-bind="{
          width: imageSize.width,
          height: imageSize.height,
          alt: placeholder,
        }"
          class="avatar-sq-picture-img"
      />
    </NuxtPicture>
  </div>
</template>

<style scoped lang="postcss">
.avatar-sq-picture {
  :deep(img) {
    object-fit: contain;
  }
}
</style>