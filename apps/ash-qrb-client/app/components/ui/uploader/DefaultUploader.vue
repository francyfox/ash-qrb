<script setup lang="ts">
import vueFilePond from 'vue-filepond';

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';

// Import styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Create FilePond component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
);

const { t } = useI18n()
</script>

<template>
  <div class="flex">
    <UModal
        :dismissible="false"
        :title="t('formUploadAvatar')"
    >
      <UButton color="primary">
        <UIcon
            name="i-lucide-file"
            :size="20"
        />

        {{ t('formUploadAvatar') }}
      </UButton>

      <template #body>
        <div id="app" class="uploader p-5">
          <ClientOnly>
            <FilePond
                v-bind="$attrs"
                ref="pond"
                accepted-file-types="image/jpg, image/jpeg, image/png"
            />
          </ClientOnly>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>

</style>