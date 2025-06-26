<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue'
import { useEditor } from '~/composables/useEditor.ts'

const model = defineModel({
  default: {
    en: undefined,
    ru: undefined,
  },
})

const Editor = useEditor()
// TODO: decompose language select
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

const editorKey = ref('0')
function rerenderEditor() {
  editorKey.value = (Number(editorKey.value) + 1).toString()
}

const language = ref<'en' | 'ru'>(languageList[0].id as any)
const text = ref()
const isTextInit = ref(false)

text.value = model.value

watch(language, (v) => {
  if (isTextInit.value) {
    text.value = model.value[v]
    rerenderEditor() // TODO: fix editor v-model (external changes doesnt work)
  }
})

watch(text, (v) => {
  if (isTextInit.value) {
    model.value[language.value] = v
  }
})
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

    {{ text }}
    <transition name="fade" mode="out-in">
      <Editor
          :key="editorKey"
          ref="editorRef"
          v-model="text"
      />
    </transition>
  </div>
</template>

<style scoped>

</style>