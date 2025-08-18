<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { defineAsyncComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalReallySure from '~/components/modals/ModalReallySure.vue'
import type { TQrbItem } from '~/types/qrb.types'
import PackrWorker from '~/components/forms/qrb-list/packr.worker.ts?worker'
import 'ash-ui/assets/DefaultUploader.css'

const ModalQrCode = defineAsyncComponent(
  () => import('~/components/modals/qrb-code/ModalQrCode.vue'),
)

const toast = useToast()

const qrbStore = useQrbStore()
const userStore = useUserStore()
const { errorMessage } = storeToRefs(userStore)

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
const showImportModal = ref(false)
const stackFile = ref<File>()
const importFile = ref<string>()
const isConverting = ref(false)

async function handleRemove() {
  if (model.value?.length > 0) {
    await qrbStore.removeManyQrb(model.value)
    await qrbStore.getQrbList()
  }

  modalReallySure.value = false
  emit('deSelect')
}

async function handleUpdate(status: boolean) {
  if (model.value?.length > 0) {
    await qrbStore.updateManyQrb(model.value, {
      status: status ? 1 : 0,
    })
    await qrbStore.getQrbList()
  }

  emit('deSelect')
}

async function handleImportModal() {
  if (!importFile.value) {
    toast.add({
      title: t('toastQrbsNoFile'),
      color: 'warning',
    })

    return
  }

  const { error } = (await qrbStore.importQrb(importFile.value)) as any // TODO: Error?

  importFile.value = undefined
  showImportModal.value = false

  if (error) {
    toast.add({
      title: error.message || 'error',
      description: error?.summary || error,
      color: 'error',
    })
  } else {
    toast.add({
      title: t('toastQrbsExported'),
      color: 'success',
    })
  }
}
async function handleExportQrb() {
  const { error } = (await qrbStore.exportQrb()) as any // TODO: error?

  if (error) {
    toast.add({
      title: error.message || 'error',
      description: error?.summary || error,
      color: 'error',
    })
  } else {
    toast.add({
      title: t('toastQrbsExported'),
      color: 'success',
    })
  }
}

async function handleAddFile({ file }) {
  isConverting.value = true
  stackFile.value = file.file

  const worker = new PackrWorker() as Worker

  worker.postMessage(file.file)

  worker.onmessage = async (e) => {
    const storedFile = await userStore.postFile(e.data, 'json/')
    importFile.value = storedFile?.originalUrl
    isConverting.value = false

    if (storedFile) {
      toast.add({
        title: t('toastQrbsImported'),
        color: 'success',
      })
    } else {
      stackFile.value = undefined
      toast.add({
        title: errorMessage.value || 'error',
        color: 'error',
      })
    }
  }
}

function handleUploaderInit(pond) {
  pond.setOptions({
    server: {
      process: (
        fieldName,
        file,
        metadata,
        load,
        error,
        progress,
        abort,
        transfer,
        options,
      ) => {
        setTimeout(() => {
          if (!stackFile.value) {
            pond.removeFile()

            return
          }

          load(importFile.value)
        }, 300)

        return {
          abort: () => {
            abort()
          },
        }
      },
    },
  })
}
</script>

<template>
  <div class="flex flex-col gap-2"
       :class="{ 'pointer-events-none opacity-5 transition-opacity': disabled }"
  >
    <div class="flex gap-2 flex-wrap">
      <UButton
          color="primary"
          type="button"
          class="cursor-pointer w-full sm:w-auto"
          icon="i-lucide-qr-code"
          @click="modalQrCode = true"
      >
        {{ t('qrbListAdd') }}
      </UButton>

      <DefaultUploader
          v-model:showModal="showImportModal"
          title="Import JSON"
          :button-props="{
            color: 'secondary',
            type: 'button',
            class: 'cursor-pointer w-full sm:w-auto',
            icon: 'i-lucide-import',
            size: 'xl'
          }"
          @add-file="handleAddFile"
          @init="handleUploaderInit"
          accepted-file-types="application/json"
          max-file-size="2MB"
          class="flex"
      >
        <template #footer>
          <UButton
              color="primary"
              type="button"
              class="cursor-pointer"
              icon="i-lucide-import"
              :loading="isConverting"
              :disabled="isConverting"
              @click="handleImportModal"
          >
            {{ isConverting ? 'Converting...' : 'Import' }}

          </UButton>
        </template>
      </DefaultUploader>

      <UButton
          color="secondary"
          type="button"
          class="cursor-pointer w-[50%] sm:w-auto"
          icon="i-lucide-file-text"
          :disabled="list.length === 0"
          @click="handleExportQrb"
      >
        Export JSON
      </UButton>
    </div>
    <div class="flex gap-2 flex-wrap">
      <UButton
          color="success"
          type="button"
          class="cursor-pointer flex-grow lg:flex-grow-0"
          icon="i-lucide-lightbulb"
          @click="handleUpdate(true)"
      >
        {{ t('actionEnable') }}
      </UButton>

      <UButton
          color="warning"
          type="button"
          class="cursor-pointer flex-grow lg:flex-grow-0"
          icon="i-lucide-lightbulb-off"
          @click="handleUpdate(false)"
      >
        {{ t('actionDisable') }}
      </UButton>

      <UButton
          color="error"
          type="button"
          class="cursor-pointer"
          icon="i-lucide-trash-2"
          :disabled="list.length === 0"
          @click="modalReallySure = true"
      >
        <span class="hidden sm:inline-block">
           {{ t('qrbListRemoveSelected') }}
        </span>
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