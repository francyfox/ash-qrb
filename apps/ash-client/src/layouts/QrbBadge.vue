<script setup lang="ts">
import SectionFooter from '~/components/sections/SectionFooter.vue'
import SectionHeader from '~/components/sections/SectionHeader.vue'
import PanelCard from '~/components/ui/cards/PanelCard.vue'
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <SectionHeader />
    <section class="layout-qrb h-full py-5">
      <div class="container">
        <div class="flex flex-col items-center gap-5">
          <RouterView />
        </div>
      </div>
    </section>
    <SectionFooter />
  </div>
</template>

<style scoped>

</style>