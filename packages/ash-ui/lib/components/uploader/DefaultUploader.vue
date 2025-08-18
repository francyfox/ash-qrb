<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui/components/Button.vue'
import { onMounted, ref, watch, useTemplateRef } from 'vue'
import vueFilePond from 'vue-filepond'
import { find, type FilePond } from 'filepond'

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
  init: [pond: FilePond]
}>()

const { title } = defineProps<{
  title: string
  buttonProps?: ButtonProps
}>()

// const userStore = useUserStore()
const showModal = defineModel('showModal', {
  default: false,
})

const pond = useTemplateRef('pond')

const handleAddFile = async (error: string, file: File) => {
  emit('addFile', { error, file })
}

function handleFilePondInit() {
  if (pond.value) {
    const uploader = find(pond.value?.$el.querySelector('.filepond--root'))
    emit('init', uploader)
  }
}
</script>

<template>
  <div class="flex">
    <UModal
        v-model:open="showModal"
        :dismissible="false"
        :title="title"
    >
      <UButton
          v-bind="buttonProps"
          class="cursor-pointer"
      >
        {{ title }}
      </UButton>

      <template #body>
        <div
            class="uploader p-5"
        >
          <ClientOnly>
            <FilePond
                ref="pond"
                v-bind="$attrs"
                @init="handleFilePondInit"
                @addfile="handleAddFile"
            />
          </ClientOnly>
        </div>
      </template>

      <template #footer>
        <slot name="footer" />
      </template>
    </UModal>
  </div>
</template>

<style scoped>

</style>