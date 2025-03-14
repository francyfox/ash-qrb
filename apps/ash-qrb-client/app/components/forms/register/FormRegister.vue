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
</script>

<template>
  <UForm
      ref="form"
      :state="state"
      :schema="registerSchema"
      class="form-register w-full flex flex-col gap-2.5"
      @submit="onSubmit"
  >
    <DefaultUploader />
  </UForm>
</template>

<style scoped>

</style>