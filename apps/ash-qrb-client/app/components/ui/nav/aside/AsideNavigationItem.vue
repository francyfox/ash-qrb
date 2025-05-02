<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
  active?: boolean
}>()
</script>

<template>
  <NuxtLink v-bind="$attrs"
            :class="[
                { disabled: 'pointer-events-none opacity-25 bg-s-black-olive' },
                { active: 'pointer-events-none bg-s-purple-taupe' }
            ]"
            aria-current-value="page"
            prefetch-on="interaction"
            class="aside-nav-item w-full flex bg-p-fawn/20 rounded-tl-md rounded-br-md p-1.5"
  >
    <span class="flex items-center gap-1.5">
      <Icon
          name="i-lucide-user-component"
          :size="24"
      />
  
      <span class="text-s-old-lace text-xl">
         <slot />
      </span>
    </span>
  </NuxtLink>
</template>

<style lang="postcss" scoped>
.aside-nav-item {
  
}
</style>