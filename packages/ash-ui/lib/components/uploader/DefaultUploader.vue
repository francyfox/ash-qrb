<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import vueFilePond from 'vue-filepond'
import { useI18n } from 'vue-i18n'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageCrop,
)

const emit = defineEmits<{
  addFile: [{ file: File; error: any }]
}>()
const { t } = useI18n()
const model = defineModel()
// const userStore = useUserStore()
const showModal = ref(false)

const pond = useTemplateRef('pond')

const handleAddFile = async (error: string, file: File) => {
  emit('addFile', { error, file })
}
</script>

<template>
  <div class="flex" ref="test">
    <UModal
        v-model:open="showModal"
        :dismissible="false"
        :title="t('formUploadAvatar')"
    >
      <UButton color="primary" class="cursor-pointer">
        <UIcon
            name="i-lucide-file"
            :size="20"
        />

        {{ t('formUploadAvatar') }}
      </UButton>

      <template #body>
        <div
            ref="pond"
            id="app"
            class="uploader p-5"
        >
          <ClientOnly>
            <FilePond
                v-bind="$attrs"
                accepted-file-types="image/jpg, image/jpeg, image/png"
                max-file-size="2MB"
                allow-image-crop="true"
                image-crop-aspect-ratio="1:1"
                @addfile="handleAddFile"
            />
          </ClientOnly>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>

</style>