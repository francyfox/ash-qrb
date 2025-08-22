<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CheckboxGroupItem, CheckboxGroupValue } from '@nuxt/ui'

const { t } = useI18n()

const show = defineModel<CheckboxGroupValue[]>('show')

const showGroup = computed<CheckboxGroupItem[]>(() => [
  {
    label: 'Value',
    description: 'Main data. Example import type - public path',
    value: 'value',
  },
  {
    label: 'Logs',
    description: 'Warnings or errors',
    value: 'logs',
  },
])
</script>

<template>
  <div class="flex flex-col gap-2">

    <div class="flex flex-col gap-2">
      <span class="text-lg">
        {{ t('queueShow') }}
      </span>

      <div class="flex">
        <UCheckboxGroup
            v-model="show"
            :items="showGroup"
            size="xl"
            variant="list"
            orientation="horizontal"
        />
      </div>
    </div>

    <div class="flex gap-2">

      <UButton
          color="error"
          type="button"
          class="cursor-pointer"
          icon="i-lucide-trash-2"
      >
        <span class="hidden sm:inline-block">
           {{ t('qrbListRemoveSelected') }}
        </span>
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>