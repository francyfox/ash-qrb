<script setup lang="ts">
const { disabled = false, active = false } = defineProps<{
  disabled?: boolean
  active?: boolean
}>()
</script>

<template>
  <NuxtLink v-bind="$attrs"
            :class="[
                { disabled: 'pointer-events-none opacity-25 bg-s-black-olive' },
            ]"
            active-class="active pointer-events-none bg-p-middle-red"
            aria-current-value="page"
            prefetch-on="interaction"
            class="aside-nav-item w-full flex rounded-tl-md rounded-br-md overflow-hidden bg-p-fawn/40 z-20"
  >
    <span class="aside-nav-item-text relative flex items-center gap-1.5 p-1.5">
      <Icon
          name="i-lucide-user-component"
          :size="24"
          class="z-10"
      />

      <span class="text-s-old-lace text-xl z-10">
         <slot />
      </span>
    </span>
  </NuxtLink>
</template>

<style scoped lang="postcss">
@reference "#root.pcss";

.aside-nav-item {

  &.active .aside-nav-item-text:after {
    display: none;
  }
  
  &-text {
    &:after {
      top: 0;
      left: 0;
      position: absolute;
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      transition: width .6s cubic-bezier(0.35, 0, 0.31, 1.2), background-color .3s ease-in-out;
      
      @apply bg-p-fawn;
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