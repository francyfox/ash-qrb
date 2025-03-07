<script setup lang="ts">
import DefaultCard from '~/components/cards/DefaultCard.vue'
import FormLogin from '~/components/forms/login/FormLogin.vue'
import FormLoginActions from '~/components/forms/login/FormLoginActions.vue'
</script>

<template>
  <section class="section-auth h-full">
    <div class="container h-full">
      <div class="w-full min-h-[65vh] flex justify-center items-center">
        <DefaultCard title="ash-qrb.org">
          <FormLogin />

          <template #footer>
            <FormLoginActions />
          </template>
        </DefaultCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>