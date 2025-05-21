<script setup lang="ts">
import type { IMGMenuItem } from '~/components/ui/menu-generator/menu-generator.types'

const model = defineModel<IMGMenuItem[]>({
  default: [
    {
      type: 'link',
      content: {
        label: undefined,
        icon: undefined,
        to: undefined,
      },
    },
  ],
})
</script>

<template>
  <div class="menu-generator">
    {{ model }}
    <div
        v-for="input in model"
        class="flex gap-2"
    >
      <UFormField label="Type">
        <USelect
            v-model="input.type"
            :search-input="false"
        />
      </UFormField>

      <template v-if="input.type === 'fetch'">
        <UFormField label="URL">
          <UInput
              v-model="input.content.to"
          />
        </UFormField>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>