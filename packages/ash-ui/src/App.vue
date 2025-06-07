<script setup lang="ts">
import NuxtImg from "~lib/components/nuxt-image/NuxtImg.vue";
import DefaultCard from "~lib/components/cards/DefaultCard.vue";
</script>

<template>
  <UApp>
    <USkeleton
        class="w-[300px] h-[300px] bottom-[-30px] left-[-60px] z-0"
    />
    <DefaultCard title="t">sss</DefaultCard>
    <NuxtImg
        src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1740737420/ash-qrb/dllmfbqsqhk5ioxaus3v.png"
        :width="400"
        :height="400"
        alt="Ash-qrb logo"
        class="absolute w-[300px] md:w-auto bottom-[-30px] left-[-60px] z-0"
    >
      <template #loading>
        <USkeleton
            class="w-[300px] h-[300px] bottom-[-30px] left-[-60px] z-0"
        />
      </template>
    </NuxtImg>
  </UApp>
</template>

<style scoped>

</style>