<script setup lang="ts">
import DefaultCard from "~/components/cards/DefaultCard.vue";

const { t } = useI18n()
</script>

<template>
  <section class="section-sign-up">
    <div class="container">
      <div class="container h-full">
        <div class="w-full min-h-[65vh] flex justify-center items-center">
          <DefaultCard :title="t('formActionSignUp')">

          </DefaultCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>