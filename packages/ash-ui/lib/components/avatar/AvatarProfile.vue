<script setup lang="ts">
import NuxtImg from '../nuxt-image/NuxtImg.vue'
import AvatarSquare, { type IAvatarSquareProps } from './AvatarSquare.vue'

interface IAvatarProfileProps extends IAvatarSquareProps {
  rating: number
}

const props = defineProps<IAvatarProfileProps>()

const { rating, ...avatarProps } = props
</script>

<template>
  <div class="avatar-profile w-[244px] h-[259px] relative flex justify-center items-center gap-2">
    <NuxtImg
        src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1746865771/ash-qrb/bjvlnajffv9yberit9wq.png"
        width="244"
        height="259"
        alt="avatar-bg"
        class="absolute top-0 left-0 w-full h-full"
        loading="lazy"
    />

    <div class="avatar-profile-rating h-full flex flex-col items-center pt-12 z-20">
      <ILucidePanelTopClose class="size-[24px]"/>

      <div class="text-6xl underline">
        {{ rating }}
      </div>
    </div>

    <AvatarSquare
        v-bind="avatarProps"
        class="z-10"
    />
  </div>
</template>

<style scoped>

</style>