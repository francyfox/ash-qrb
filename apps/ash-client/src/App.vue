<script setup lang="ts">
</script>
<template>
  <UApp>
    <RouterView v-slot="{ Component, route }">
      <Component :is="Component" :key="route" />
    </RouterView>
  </UApp>
</template>