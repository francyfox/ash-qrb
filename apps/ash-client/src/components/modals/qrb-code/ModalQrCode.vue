<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { storeToRefs } from 'pinia'
import {
  computed,
  defineAsyncComponent,
  toRaw,
  markRaw,
  ref,
  watch,
  shallowRef,
} from 'vue'
import { useI18n } from 'vue-i18n'
import { useQrbStore } from '~/stores/qrb.ts'
import {
  createQrb,
  updateQrbCode,
} from '~/components/modals/qrb-code/modalQrCode.service.ts'

const { id } = defineProps<{ id?: string }>()

const toast = useToast()

const qrbStore = useQrbStore()
const { qrb } = storeToRefs(qrbStore)

const { errorMessage } = storeToRefs(qrbStore)
const model = defineModel<boolean>()
const emit = defineEmits<{
  onSubmit: []
  onCancel: []
}>()

const { t } = useI18n()
const text = ref({
  en: undefined,
  ru: undefined,
})
const baseFormData = ref()

if (id) {
  await qrbStore.getQrbById(id)
  const { body, name, description, status } = toRaw(qrb.value)

  text.value = body as any

  baseFormData.value = {
    name,
    description,
    status,
  }
}

const items = ref<TabsItem[]>([
  {
    name: 'formQrGeneral',
    icon: 'i-lucide-message-circle-warning',
    component: markRaw(
      defineAsyncComponent(() => import('~/components/forms/qr/FormQr.vue')),
    ),
    model: baseFormData,
    props: {},
    listeners: {
      async onSubmit(v: any) {
        if (id) {
          await updateQrbCode({ id, v, text, t })
        } else {
          await createQrb({ v, text, t })
        }

        await qrbStore.getQrbList()

        model.value = false
      },
    },
  },
  {
    name: 'formQrDescription',
    icon: 'i-lucide-notepad-text',
    component: markRaw(
      defineAsyncComponent(
        () => import('~/components/forms/qr/FormQrEditor.vue'),
      ),
    ),
    model: text,
    props: {},
    listeners: {},
  },
])
const orientation = computed(() =>
  items.value.length > 4 ? 'vertical' : 'horizontal',
)

const plugins = ref([])
const pluginsList = ref([
  {
    id: 0,
    label: 'Validator',
  },
  {
    id: 1,
    label: 'Stars',
  },
])
</script>

<template>
  <UModal
      v-model:open="model"
      :title="t('modalCreateQrTitle')"
      :ui="{ body: 'bg-(--color-s-champagne)' }"
      class="max-w-3xl"
  >
    <template #body>
      <div class="flex flex-col gap-5">
        <div class="flex">
          <USelectMenu
              v-model="plugins"
              :items="pluginsList"
              class="min-w-[200px]"
              size="xl"
              placeholder="Select Plugins"
              multiple
              disabled
          />
        </div>

        <UTabs
            v-bind="{ items, orientation }"
            size="lg"
            class="w-full"
        >
          <template #leading="{ item }">
          <span class="flex items-center gap-1 text-lg">
            <UIcon :name="item.icon" class="size-6" />

            {{ t(item.name) }}
          </span>
          </template>
          <template #content="{ item }">
            <KeepAlive>
              <component
                  v-model="item.model"
                  v-bind="item.props"
                  :is="item.component"
                  v-on="item.listeners"
              />
            </KeepAlive>
          </template>
        </UTabs>
      </div>
    </template>
  </UModal>
</template>

<style scoped>

</style>