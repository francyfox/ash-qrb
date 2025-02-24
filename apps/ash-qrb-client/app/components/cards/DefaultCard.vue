<script setup lang="ts">
  const props = defineProps<{
    title: string
  }>()
</script>

<template>
  <div class="default-card flex flex-col items-center gap-2.5 self-stretch px-10 py-5">
    <div v-if="title" class="default-card-title text-[color:var(--app-s-purple-taupe,#49454A)] font-sofia text-4xl font-normal leading-[54px]">
      {{ title }}
    </div>

    <slot />

    <div class="default-card-footer flex flex-col justify-center items-center self-stretch [background:linear-gradient(180deg,#49454A_0%,#AEA4B0_349.4%)] px-10 py-2.5">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>

</style>