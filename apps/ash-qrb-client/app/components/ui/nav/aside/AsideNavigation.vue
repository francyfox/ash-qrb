<script setup lang="ts">
import AsideNavigationItem from '~/components/ui/nav/aside/AsideNavigationItem.vue'

const { t } = useI18n()

const data = computed(() => [
  {
    id: useId(),
    text: t('asideNavProfile'),
    attrs: {
      to: { name: 'dashboard' },
    },
  },
  {
    id: useId(),
    text: t('asideNavList'),
    attrs: {
      to: { name: 'qrb-list' },
    },
  },
])
</script>

<template>
  <nav class="aside-nav flex flex-col gap-4">
    <AsideNavigationItem
        v-for="i in data" :key="i.id"
        v-bind="i.attrs"
    >
      {{ i.text }}
    </AsideNavigationItem>
  </nav>
</template>

<style scoped>

</style>