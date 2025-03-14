<script setup lang="ts">
import DefaultCard from "~/components/ui/cards/DefaultCard.vue";
import FormRegister from "~/components/forms/register/FormRegister.vue";
import FormRegisterActions from "~/components/forms/register/FormRegisterActions.vue";

const { t } = useI18n()
</script>

<template>
  <section class="section-sign-up">
    <div class="container">
      <div class="container h-full">
        <div class="w-full min-h-[65vh] flex justify-center items-center">
          <DefaultCard :title="t('formActionSignUp')">
            <FormRegister />

            <template #footer>
              <FormRegisterActions />
            </template>
          </DefaultCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>