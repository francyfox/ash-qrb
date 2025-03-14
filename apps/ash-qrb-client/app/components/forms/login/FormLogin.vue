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
  readonly: true,
})

async function onSubmit(event: FormSubmitEvent<TLoginSchema>) {
  form.value!.clear()
  // Do something with event.data
  console.log(event.data)
}

onMounted(() => {
  state.value.readonly = false;
})

</script>

<template>
  <UForm
      ref="form"
      :schema="LoginSchema"
      :state="state"
      class="form-login w-full flex flex-col gap-2.5"
      @submit="onSubmit"
  >
    <USwitch
        v-model="state.switch"
        :label="t('formLoginSwitchEmail')"
        :ui="{ container: 'pt-1.5', thumb: 'bg-(--ui-text)', label: 'text-lg' }"
    />

    <FormLoginProviders />

    <UInput
        v-if="state.switch"
        v-model="state.email"
        :placeholder="t('formLoginEmail')"
        :readonly="state.readonly"
        :ui="{ base: 'text-lg' }"
        icon="i-lucide-mail"
        type="email"
        class="form-login-email"
    />

    <UInput
        v-model="state.phone"
        :placeholder="t('formLoginPhone')"
        :readonly="state.readonly"
        :ui="{ base: 'text-lg' }"
        icon="i-lucide-phone"
        type="tel"
        class="form-login-phone"
    />

    <UInput
        v-model="state.password"
        :placeholder="t('formLoginPassword')"
        :readonly="state.readonly"
        :ui="{ base: 'text-lg' }"
        icon="i-lucide-lock"
        type="password"
        class="form-login-password"
    />
  </UForm>
</template>

<style scoped>

</style>