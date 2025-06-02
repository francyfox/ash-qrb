<script setup lang="ts">
import AvatarSquare, {
  type IAvatarSquareProps,
} from '~/components/avatar/AvatarSquare.vue'

interface IAvatarProfileProps extends IAvatarSquareProps {
  rating: number
}

const props = defineProps<IAvatarProfileProps>()

const { rating, ...avatarProps } = props
</script>

<template>
  <div class="avatar-profile w-[244px] h-[259px] relative flex justify-center items-center gap-2">
    <img
        src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1746865771/ash-qrb/bjvlnajffv9yberit9wq.png"
        width="244"
        height="259"
        alt="avatar-bg"
        class="absolute top-0 left-0 w-full h-full z-10"
        loading="lazy"
    />

    <div class="avatar-profile-rating h-full flex flex-col items-center z-20 pt-12">
      <Icon
          name="i-lucide-panel-top-close"
          :size="24"
      />
      <div class="text-6xl underline">
        {{ rating }}
      </div>
    </div>

    <AvatarSquare
        v-bind="avatarProps"
        class="z-20"
    />
  </div>
</template>

<style scoped>

</style>