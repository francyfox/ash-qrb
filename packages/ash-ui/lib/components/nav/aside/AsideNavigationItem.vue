<script setup lang="ts">
const { disabled = false, active = false } = defineProps<{
  disabled?: boolean
  active?: boolean
}>()
</script>

<template>
  <RouterLink
      v-bind="$attrs"
      :class="[
          { disabled: 'pointer-events-none opacity-25 bg-s-black-olive' },
      ]"
      class="aside-nav-item w-full flex rounded-tl-md rounded-br-md overflow-hidden bg-p-fawn/40"
      active-class="active pointer-events-none bg-p-middle-red"
  >
    <span class="aside-nav-item-text text-s-old-lace relative flex items-center gap-1.5 p-1.5">
      <ILucideComponent class="size-[24px] z-10" />

      <span class="text-s-old-lace text-xl z-10">
         <slot />
      </span>
    </span>
  </RouterLink>
</template>

<style scoped lang="postcss">
.aside-nav-item {
  &.active .aside-nav-item-text:after {
    display: none;
  }
  
  &-text {
    &:after {
      content: '';
      transition: width .6s cubic-bezier(0.35, 0, 0.31, 1.2), background-color .3s ease-in-out;
      
      @apply bg-p-fawn top-0 left-0 absolute block w-full h-full;
    }
  }

  &:hover {
    .aside-nav-item-text:after {
      width: 500px;

      @apply bg-p-middle-red;
    }
  }
}
</style>