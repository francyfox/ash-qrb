<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const model = defineModel<boolean>()

const { url } = defineProps<{
  url: string
}>()
</script>

<template>
  <UModal v-model:open="model" :title="t('modalReallySure')">
    <template #body>
      <div class="flex flex-col text-md gap-2">
        <p>
          <i v-html="t('modalExternalCaption')" />
        </p>
      </div>
    </template>

    <template #footer>
      <a
          :href="url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-s-old-lace bg-p-middle-red hover:bg-p-fawn rounded-lg px-4 py-2"
      >
        <UIcon
            name="i-lucide-square-arrow-out-up-right"
        />

        {{ t('scannerGoToPage') }}
      </a>
    </template>
  </UModal>
</template>

<style scoped>

</style>