<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
const dashboardStore = useDashboardStore()

const route = useRoute()
const openBurger = ref(false)

watch(route, () => {
  openBurger.value = false
})
</script>

<template>
  <header class="sticky top-0 left-0 w-full z-50">
    <div class="container">
      <div class="flex">
        <HeaderDrop
            v-model:openBurger="openBurger"
            v-bind="{ data: dashboardStore.navData }"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>