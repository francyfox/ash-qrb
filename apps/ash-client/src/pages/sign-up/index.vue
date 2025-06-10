<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FormRegister from '~/components/forms/register/FormRegister.vue'
import FormRegisterActions from '~/components/forms/register/FormRegisterActions.vue'

const { t } = useI18n()
const userStore = useUserStore()

const state = ref({
  image: undefined,
  position: undefined,
  username: undefined,
  phone: undefined,
  email: undefined,
  password: undefined,
  repeatPassword: undefined,
})

const signUpHandler = async () => {
  await userStore.signUp(state.value)
}
</script>

<template>
  <section class="section-sign-up">
    <div class="container">
      <div class="container h-full">
        <div class="w-full min-h-[65vh] flex justify-center items-center">
          <DefaultCard :title="t('formActionSignUp')">
            <FormRegister
                v-model="state"
                @onSubmit="signUpHandler"
            />

            <template #footer>
              <FormRegisterActions
                  @onSubmit="signUpHandler"
              />
            </template>
          </DefaultCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>