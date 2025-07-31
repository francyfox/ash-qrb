<script setup lang="ts">
import AsideNavigation, {
  type AsideNavigationProps,
} from '../nav/aside/AsideNavigation.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const { data } = defineProps<AsideNavigationProps>()
const open = defineModel({ default: false })

const route = useRoute()

watch(
  route,
  () => {
    open.value = false
  },
  {
    immediate: true,
    deep: true,
    flush: 'pre',
  },
)
</script>

<template>
  <USlideover
      v-model:open="open"
      close-icon="i-lucide-x"
      side="left"
      title="Menu"
      :ui="{ overlay: 'z-60', content: 'z-70', body: '!p-0' }"
      class="menu-burger"
  >
    <UButton
        size="xl"
        icon="i-lucide-menu"
        label="Menu"
        class="flex lg:hidden"
    />

    <template #body>
      <div class="h-full flex flex-col gap-2 p-3">
        <AsideNavigation
            v-bind="{ data }"
        />
      </div>
    </template>
  </USlideover>
</template>

<style scoped>

</style>