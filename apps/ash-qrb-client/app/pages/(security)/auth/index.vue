<script setup lang="ts">
import DefaultCard from '~/components/cards/DefaultCard.vue'
import LightCard from '~/components/cards/LightCard.vue'

const { t } = useI18n()
</script>

<template>
  <section class="section-auth">
    <div class="container">
      <DefaultCard title="ash-qrb.org">
        <LightCard>
          <span class="text-base text-s-black-olive font-sofia">
            {{ t('test') }}
          </span>
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