<script setup lang="ts">
import { LoginSchema, type TLoginSchema } from '~/components/forms/login/login.schema'
import type { Form, FormSubmitEvent } from '#ui/types'
import FormLoginProviders from '~/components/forms/login/providers/FormLoginProviders.vue'

const form = ref<Form<TLoginSchema>>()

const state = ref({
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
      class="form-login"
      @submit="onSubmit"
  >
    <US
    <FormLoginProviders />

    <UFormGroup name="email">
      <UInput v-model="state.email" />
    </UFormGroup>
  </UForm>
</template>

<style scoped>

</style>