<script setup lang="ts">
import vueFilePond from 'vue-filepond'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Import styles
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import { useUserStore } from '@/stores/user'

// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageCrop,
)

const { t } = useI18n()
const model = defineModel()
const userStore = useUserStore()

const pond = useTemplateRef('pond')

const handleAddFile = async (error: any, file: any) => {
  model.value = await userStore.postFile(file.file)
}
</script>

<template>
  <div class="flex" ref="test">
    <UModal
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