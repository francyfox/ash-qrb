<script setup lang="ts">
import { LoginSchema, type TLoginSchema } from '~/components/forms/login/login.schema'
import type { Form, FormSubmitEvent } from '#ui/types'
import FormLoginProviders from '~/components/forms/login/providers/FormLoginProviders.vue'

const { t } = useI18n()
const form = ref<Form<TLoginSchema>>()

const state = ref({
  switch: false,
  email: undefined,
  phone: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<TLoginSchema>) {
  form.value!.clear()
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <UForm
      ref="form"
      :schema="LoginSchema"
      :state="state"
      class="form-login flex flex-col gap-2.5"
      @submit="onSubmit"
  >
    <USwitch
        v-model="state.switch"
        :label="t('formLoginSwitchEmail')"
    />

    <FormLoginProviders />

    <UInput
        v-if="state.switch"
        v-model="state.email"
        :placeholder="t('formLoginEmail')"
        autocomplete="email"
        type="email"
        class="form-login-email"
    />

    <UInput
        v-else
        v-model="state.phone"
        :placeholder="t('formLoginPhone')"
        autocomplete="tel"
        type="tel"
        class="form-login-phone"
    />

    <UInput
        v-model="state.password"
        :placeholder="t('formLoginPassword')"
        type="password"
        class="form-login-password"
    />
  </UForm>
</template>

<style scoped>

</style>