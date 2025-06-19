<script setup lang="ts">
import { computed, ref } from 'vue'
import { useEditor } from '~/composables/useEditor.ts'

const model = defineModel<Record<'en' | 'ru', unknown>>({
  default: {
    en: undefined,
    ru: undefined,
  },
})
const Editor = useEditor()
const languageList = [
  {
    label: 'English',
    id: 'en',
  },
  {
    label: 'Русский',
    id: 'ru',
  },
]

const language = ref(languageList[0].id)
const text = ref({})

// function handleChange(v) {
//   language.value = v
// }
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="max-w-[200px]">
      <USelectMenu
          v-model="language"
          value-key="id"
          :items="languageList"
          icon="i-lucide-languages"
          size="xl"
          arrow
      />
    </div>

    <Editor
        v-model="text"
    />
    {{ text }}
  </div>
</template>

<style scoped>

</style>