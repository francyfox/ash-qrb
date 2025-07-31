<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router'
import AsideNavigationItem from './AsideNavigationItem.vue'

export interface AsideNavigationProps {
  data: {
    id: string
    text: string
    attrs: RouterLinkProps
  }[]
}

defineProps<AsideNavigationProps>()
</script>

<template>
  <aside class="relative flex flex-col gap-5">
    <nav class="aside-nav flex flex-col gap-4">
      <AsideNavigationItem
          v-for="i in data" :key="i.id"
          v-bind="i.attrs"
      >
        {{ i.text }}
      </AsideNavigationItem>
    </nav>
  </aside>
</template>

<style scoped>

</style>