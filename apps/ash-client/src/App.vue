<template>
  <RouterView v-slot="{ Component, route }">
    <Component :is="Component" :key="route" />
  </RouterView>
</template>
<script setup lang="ts">
</script>