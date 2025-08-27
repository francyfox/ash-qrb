<script setup lang="ts">
import NuxtImg from '~lib/components/nuxt-image/NuxtImg.vue'

interface Props {
  src?: string
  width?: number
  height?: number
  alt?: string
}

const { src, width = 200, height = 200, alt = 'QRB Image' } = defineProps<Props>()
</script>

<template>
  <div class="qrb-image">
    <NuxtImg
        :src="src"
        :width="width"
        :height="height"
        :alt="alt"
        :custom="true"
    >
      <template #loading>
        <USkeleton
            class="w-full h-full"
            :style="{ width: width + 'px', height: height + 'px' }"
        />
      </template>
    </NuxtImg>
  </div>
</template>

<style scoped>

</style>