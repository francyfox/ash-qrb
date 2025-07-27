<script setup lang="ts">
import SectionHeader from '~/components/sections/SectionHeader.vue'
</script>

<template>
  <div class="default-layout w-full h-full flex-col">
    <SectionHeader />
    <RouterView />
  </div>
</template>

<style scoped lang="postcss">
.default-layout {
  background: url("~/assets/images/bg.jpg") center center / cover no-repeat;
}
</style>