<script setup lang="ts">
import SectionFooter from '~/components/sections/SectionFooter.vue'
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <section class="layout-qrb h-full py-5">
      <div class="container">
        <div class="flex flex-col items-center gap-5">
          <Suspense>
            <RouterView />
          </Suspense>
        </div>
      </div>
    </section>
    <SectionFooter />
  </div>
</template>

<style scoped>

</style>