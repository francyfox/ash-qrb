<script setup lang="ts">
</script>

<template>
  <div class="default-layout w-full h-full flex-col">
    <RouterView />
  </div>
</template>

<style scoped lang="postcss">
.default-layout {
  background: url("~/assets/images/bg.jpg") center center / cover no-repeat;
}
</style>