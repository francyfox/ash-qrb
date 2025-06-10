<script setup lang="ts">
import type { IMGMenuItem } from './menu-generator.types'

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

const handleAdd = () => {
  model.value.push({
    type: 'link',
    content: {
      label: undefined,
      icon: undefined,
      to: undefined,
    },
  })
}
</script>

<template>
  <div class="menu-generator flex flex-col gap-2">
    <div
        v-for="input in model"
        class="flex justify-start gap-2"
    >
      <UFormField
          label="Type"
          size="xl"
      >
        <USelect
            v-model="input.type"
            :items="['link', 'fetch']"
            :search-input="false"
            size="xl"
        />
      </UFormField>

      <TransitionGroup tag="div" class="w-full" appear>
        <template v-if="input.type === 'link'">
          <UFormField
              label="URL"
              size="xl"
              class="w-full"
          >
            <UInput
                v-model="input.content.to"
                size="xl"
                class="w-full"
            />
          </UFormField>
        </template>

        <template v-if="input.type === 'fetch'">
          <UFormField
              label="Fetch"
              hint="use JS fetch"
              class="w-full"
              size="xl"
          >
            <UInput
                v-model="input.content.request"
                size="xl"
                class="w-full"
            />
          </UFormField>
        </template>
      </TransitionGroup>
    </div>

    <div class="flex justify-center">
      <UButton
          type="button"
          icon="i-lucide-circle-plus"
          color="primary"
          @click="handleAdd"
      />
    </div>
  </div>
</template>

<style scoped>

</style>