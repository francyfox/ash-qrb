<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TLoginSchema } from '~/components/forms/login/login.schema'
import {
  type TRegisterSchema,
  registerSchema,
} from '~/components/forms/register/register.schema'
import type { IUser } from '~/components/forms/register/register.types'
import type { Form, FormSubmitEvent } from '#ui/types'
import 'ash-ui/assets/DefaultUploader.css'

const { t } = useI18n()

const emit = defineEmits<{
  onSubmit: [formData: IUser]
}>()

const form = ref<Form<TRegisterSchema | any>>()

const toast = useToast()

const userStore = useUserStore()
const { errorMessage } = storeToRefs(userStore)
const isUploading = ref(false)
const showUploadModal = ref(false)

const state = defineModel<IUser>({
  default: {
    image: undefined,
    position: undefined,
    username: undefined,
    phone: undefined,
    email: undefined,
    password: undefined,
    repeatPassword: undefined,
  },
})

const readonly = ref(true)

async function onSubmit(event: FormSubmitEvent<TLoginSchema>) {
  emit('onSubmit', event.data as any)
  if (form.value) form.value.clear()
}

async function handleUploadAvatar({ file }) {
  try {
    const { url } = await userStore.postFile(file.file)

    state.value.image = url
    toast.add({
      title: 'Avatar Uploaded',
      color: 'success',
    })
  } catch (e) {
    toast.add({
      title: errorMessage.value,
      color: 'error',
    })
  }

  showUploadModal.value = false
}

watch(errorMessage, () => {
  toast.add({
    title: t('formError'),
    description: errorMessage.value?.message || 'Unknown error',
    color: 'error',
  })
})

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
    <div class="flex flex-row items-end gap-2">
      <div class="relative">
        <AvatarSquare
            :rating="0"
            :src="state.image"
            :loading="true"
            size="sm"
        />
      </div>

      <DefaultUploader
          v-model:showModal="showUploadModal"
          accepted-file-types="image/jpg, image/jpeg, image/png"
          max-file-size="2MB"
          allow-image-crop="true"
          image-crop-aspect-ratio="1:1"
          :title="t('formUploadAvatar')"
          @add-file="handleUploadAvatar"
      />
    </div>

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

<style lang="postcss" scoped>
</style>