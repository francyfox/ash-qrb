<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { type Ref, reactive, ref, toRaw, unref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  QRB_STATUS,
  type TQrbSchema,
  qrSchema,
} from '~/components/forms/qr/qr.schema'
import type { Form, FormSubmitEvent } from '#ui/types'

type TStatusOption = (typeof statusOptions.value)[number]
type TQrbProps = Omit<TQrbSchema, 'status'> &
  Record<'status', TStatusOption | undefined>

const { t } = useI18n()

const emit = defineEmits<{
  onSubmit: [data: any]
}>()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const QrSchemaValidator = qrSchema()

const form = ref<Form<TQrbSchema>>()

const statusOptions = ref([
  {
    icon: 'i-lucide-eye',
    label: t('statusActive'),
    value: QRB_STATUS.ACTIVE,
  },
  {
    icon: 'i-lucide-eye-off',
    label: t('statusDisabled'),
    value: QRB_STATUS.DISABLED,
  },
])

const model = defineModel<TQrbProps>()

const state = reactive<TQrbProps>({
  status: undefined,
  name: undefined,
  description: undefined,
})

if (model.value) {
  for (const key in model.value) {
    state[key] = model.value[key]
  }
} else {
  state.status = statusOptions.value[0]
}

const menu: Ref<any[]> = ref([
  {
    type: 'link',
    content: {
      label: 'test',
      icon: 'i-lucide-edit',
      to: '',
    },
  },
])

const handleSubmit = (event: FormSubmitEvent<TQrbProps>) => {
  if (form.value) form.value.clear()

  const menuList = toRaw(menu.value)
  const { status, ...data } = toRaw(event.data)

  console.log(user.value)

  const formData = {
    ...data,
    status: status?.value,
    userId: user.value?.id,
    menuList,
  }

  console.log(formData)

  emit('onSubmit', formData)
}

watch(state, (v) => {
  model.value = {
    ...v,
    ...unref(menu),
  }
})
</script>

<template>
  <UForm
      ref="form"
      :schema="QrSchemaValidator"
      :state="state"
      class="form-qrb w-full flex flex-col gap-2.5"
      @submit="handleSubmit"
  >
    <UFormField
        :label="t('status')"
        size="xl"
        name="status"
    >
      <USelectMenu
          v-model="state.status"
          :icon="state.status?.icon"
          :search-input="false"
          :items="statusOptions"
          size="xl"
          class="w-full"
      />
    </UFormField>

    <UFormField
        :label="t('labelQrbName')"
        size="xl"
        name="name"
        required
    >
      <UInput
          v-model="state.name"
          size="xl"
          class="w-full"
      />
    </UFormField>

<!--    <MenuGenerator-->
<!--        v-model="menu"-->
<!--    />-->

    <div class="flex">
      <UButton
          type="submit"
          icon="i-lucide-rocket"
          class="cursor-pointer"
      >
        {{ t('formActionSend') }}
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>