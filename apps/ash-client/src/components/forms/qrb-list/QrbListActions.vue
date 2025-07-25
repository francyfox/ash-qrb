<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalReallySure from '~/components/modals/ModalReallySure.vue'
import type { TQrbItem } from '~/types/qrb.types'

const ModalQrCode = defineAsyncComponent(
  () => import('~/components/modals/qrb-code/ModalQrCode.vue'),
)

const qrbStore = useQrbStore()
const model = defineModel<string[]>({ default: [] })

const emit = defineEmits<{
  deSelect: []
}>()

const { list = [], disabled } = defineProps<{
  list: TQrbItem[]
  disabled?: boolean
}>()

const { t } = useI18n()

const modalReallySure = ref(false)
const modalQrCode = ref(false)

async function handleRemove() {
  if (model.value?.length > 0) {
    await qrbStore.removeQrb(model.value || [])
    await qrbStore.getQrbList()
  }

  modalReallySure.value = false
  emit('deSelect')
}
</script>

<template>
  <div class="flex flex-col gap-2"
       :class="{ 'pointer-events-none opacity-5 transition-opacity': disabled }"
  >
    <div class="flex gap-2">
      <UButton
          color="primary"
          type="button"
          class="cursor-pointer"
          icon="i-lucide-qr-code"
          @click="modalQrCode = true"
      >
        {{ t('qrbListAdd') }}
      </UButton>

      <UButton
          color="secondary"
          type="button"
          class="cursor-pointer"
          icon="i-lucide-import"
      >
        Import JSON
      </UButton>

      <UButton
          color="secondary"
          type="button"
          class="cursor-pointer"
          icon="i-lucide-file-text"
          :disabled="list.length === 0"
      >
        Export JSON
      </UButton>
    </div>
    <div class="flex gap-2">
      <UButton
          color="error"
          type="button"
          class="cursor-pointer"
          icon="i-lucide-trash-2"
          :disabled="list.length === 0"
          @click="modalReallySure = true"
      >
        {{ t('qrbListRemoveSelected') }}
      </UButton>

      <UButton
          color="success"
          type="button"
          class="cursor-pointer"
          icon="i-lucide-lightbulb"
      >
        {{ t('actionEnable') }}
      </UButton>

      <UButton
          color="warning"
          type="button"
          class="cursor-pointer"
          icon="i-lucide-lightbulb-off"
      >
        {{ t('actionDisable') }}
      </UButton>
    </div>

    <ModalReallySure
        v-model="modalReallySure"
        @onSubmit="handleRemove"
        @onClose=""
    />

    <ModalQrCode
        v-if="modalQrCode"
        v-model="modalQrCode"
    />
  </div>
</template>

<style scoped>

</style>