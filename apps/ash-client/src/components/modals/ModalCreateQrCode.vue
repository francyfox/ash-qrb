<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { storeToRefs } from 'pinia'
import { computed, defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQrbStore } from '~/stores/qrb'

const toast = useToast()

const qrbStore = useQrbStore()
const { errorMessage } = storeToRefs(qrbStore)
const model = defineModel<boolean>()
const emit = defineEmits<{
  onSubmit: []
  onCancel: []
}>()

const { t } = useI18n()
const items = ref<TabsItem[]>([
  {
    label: t('formQrGeneral'),
    icon: 'i-lucide-message-circle-warning',
    component: defineAsyncComponent(
      () => import('~/components/forms/qr/FormQr.vue'),
    ),
  },
  {
    label: 'Description',
    icon: 'i-lucide-notepad-text',
    component: defineAsyncComponent(
      () => import('~/components/forms/qr/FormQrEditor.vue'),
    ),
  },
])
const orientation = computed(() =>
  items.value.length > 4 ? 'vertical' : 'horizontal',
)

const handleSubmit = async (v: any) => {
  const { error } = await qrbStore.postQrb({ qrb: v })

  if (error) {
    toast.add({
      title: error.message || 'error',
      description: error?.summary || error,
      color: 'error',
    })
  } else {
    toast.add({
      title: t('toastQrCreated'),
      color: 'success',
    })
  }

  model.value = false
}
</script>

<template>
  <UModal
      v-model:open="model"
      :title="t('modalCreateQrTitle')"
      :ui="{ body: 'bg-(--color-s-champagne)' }"
      class="max-w-3xl"
  >
    <template #body>
      <UTabs
          v-bind="{ items, orientation }"
          size="lg"
          class="w-full"
      >
        <template #content="{ item }">
          <KeepAlive>
            <component :is="item.component" />
          </KeepAlive>
        </template>
      </UTabs>
<!--      <FormQr-->
<!--          @onSubmit="handleSubmit"-->
<!--      />-->
    </template>
  </UModal>
</template>

<style scoped>

</style>