<script setup lang="ts">
import type { Form } from '#ui/types'
import {
  QRB_STATUS,
  qrSchema,
  type TQrbSchema,
} from '~/components/forms/qr/qr.schema'
import MenuGenerator from '~/components/ui/menu-generator/MenuGenerator.vue'

const { t } = useI18n()

const emit = defineEmits<{
  onSubmit: []
}>()

const QrSchema = qrSchema()

const form = ref<Form<TQrbSchema>>()

type TStatusOption = (typeof statusOptions.value)[number]
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

const defaultOption = statusOptions.value[0]

const state = defineModel<
  Omit<TQrbSchema, 'status'> & Record<'status', TStatusOption | undefined>
>({
  default: {
    status: undefined,
    name: undefined,
    description: undefined,
  },
})

state.value.status = defaultOption

const menu = ref()
</script>

<template>
  <UForm
      ref="form"
      :schema="QrSchema"
      :state="state"
      class="form-qrb w-full flex flex-col gap-2.5"
      @submit="emit('onSubmit')"
  >
    <UFormField :label="t('status')" size="xl">
      <USelectMenu
          v-model="state.status"
          :icon="state.status?.icon"
          :search-input="false"
          :items="statusOptions"
          @change="v => state.status = v"
          class="w-full"
      />
    </UFormField>

    <UFormField :label="t('labelQrbName')" size="xl">
      <UInput
          v-model="state.name"
          class="w-full"
      />
    </UFormField>

    <UFormField :label="t('labelDescription')" size="xl">
      <UTextarea
          v-model="state.description"
          class="w-full"
      />
    </UFormField>

    <MenuGenerator
        v-model="menu"
    />

    <div class="flex">
      <UButton
          type="submit"
          icon="i-lucide-rocket"
      >
        {{ t('formActionSend') }}
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>