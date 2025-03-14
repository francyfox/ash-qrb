<script setup lang="ts">
import type { Form, FormSubmitEvent } from "#ui/types";
import { registerSchema, type TRegisterSchema } from "~/components/forms/register/register.schema";
import type { TLoginSchema } from "~/components/forms/login/login.schema";
import DefaultUploader from "~/components/ui/uploader/DefaultUploader.vue";

const { t } = useI18n()
const form = ref<Form<TRegisterSchema>>()

const state = ref({
  avatar: undefined,
  position: undefined,
  username: undefined,
  phone: undefined,
  email: undefined,
  password: undefined,
  repeatPassword: undefined,
})

const readonly = ref(true)

async function onSubmit(event: FormSubmitEvent<TLoginSchema>) {
  form.value!.clear()
  // Do something with event.data
  console.log(event.data)
}

onMounted(() => {
  readonly.value = false
})
</script>

<template>
  <UForm
      ref="form"
      :state="state"
      :schema="registerSchema"
      class="form-register w-full flex flex-col gap-2.5"
      @submit="onSubmit"
  >
    <DefaultUploader
        v-model="state.avatar"
    />


    <UInput
        v-model="state.phone"
        :placeholder="t('formLoginPhone')"
        :readonly="readonly"
        :ui="{ base: 'text-lg' }"
        icon="i-lucide-phone"
        type="tel"
        class="form-register-phone"
    />

    <UInput
        v-model="state.email"
        :placeholder="t('formLoginEmail')"
        :readonly="readonly"
        :ui="{ base: 'text-lg' }"
        icon="i-lucide-mail"
        type="email"
        autocomplete="email"
        class="form-register-email"
    />

    <UInput
        v-model="state.password"
        :placeholder="t('formLoginPassword')"
        :readonly="readonly"
        :ui="{ base: 'text-lg' }"
        icon="i-lucide-lock"
        type="password"
        class="form-register-password"
    />

    <UInput
        v-model="state.repeatPassword"
        :placeholder="t('formPasswordRepeat')"
        :readonly="readonly"
        :ui="{ base: 'text-lg' }"
        icon="i-lucide-lock"
        type="password"
        class="form-register-password-repeat"
    />

  </UForm>
</template>

<style scoped>

</style>