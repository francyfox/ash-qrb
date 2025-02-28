<script setup lang="ts">
import DefaultCard from '~/components/cards/DefaultCard.vue'
import LightCard from '~/components/cards/LightCard.vue'
</script>

<template>
  <section class="section-auth">
    <div class="container">
      <DefaultCard title="ash-qrb.org">
        <LightCard>
          
        </LightCard>

        <template #footer>
          test
        </template>
      </DefaultCard>
    </div>
  </section>
</template>

<style scoped>
</style>