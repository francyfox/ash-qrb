<script setup lang="ts">
  const props = defineProps<{
    title: string
  }>()

  const slots = useSlots()

  const hasCardFooterSlot = !!slots['footer']
</script>

<template>
  <div class="default-card flex w-full max-w-[560px] max-w-screen-sm flex-col items-start gap-2.5 sm:rounded-[var(--Corner-Small,8px)] overflow-hidden [background:linear-gradient(180deg,var(--app-s-dark-vanilla,#DACBB1)_0%,var(--app-s-champagne,#F1EACE)_100%)] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]">
    <div class="default-card-container flex flex-col items-center self-stretch gap-2.5">
      <div v-if="title" class="default-card-title text-[color:var(--app-s-purple-taupe,#49454A)] font-sofia text-4xl font-normal leading-[54px]">
        {{ title }}
      </div>

      <div class="default-card-content w-full flex flex-col items-center gap-5 pb-5">
        <slot />
      </div>

      <div
          v-if="hasCardFooterSlot"
          class="default-card-footer flex flex-col justify-center items-center self-stretch [background:linear-gradient(180deg,#49454A_0%,#AEA4B0_349.4%)] px-10 py-2.5"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>