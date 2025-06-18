<script setup lang="ts">
// import type { Delta } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { defineAsyncComponent, h, ref, useTemplateRef } from 'vue'

const emit = defineEmits<{
  onUpload: [file: File]
}>()

const QEditor = defineAsyncComponent(
  async () => (await import('@vueup/vue-quill')).QuillEditor,
)

const QuillEditor = QEditor

const model = defineModel()
const { placeholder = 'Text editor' } = defineProps<{
  placeholder?: string
  modules: []
}>()
const editorRef = useTemplateRef('editorRef')
const contentLength = ref(1)
const maxLength = ref(150)

const onUpdate = ({ oldContents }) => {
  contentLength.value = editorRef.value?.getQuill().getLength()

  if (contentLength.value >= maxLength.value && oldContents) {
    editorRef.value?.getQuill().setContents(oldContents)
  }
}
</script>

<template>
  <div class="editor">
    <QuillEditor
        ref="editorRef"
        v-model:content="model"
        v-bind="{ modules, placeholder }"
        theme="snow"
        toolbar="full"
        @editorChange="onUpdate"
        class="editor-area flex flex-col mb-2 min-h-[300px]"
    />

    <div class="editor-length text-xl">
      {{ contentLength }} / {{ maxLength }}
    </div>
  </div>
</template>

<style lang="postcss">
@import "@vueup/vue-quill/dist/vue-quill.snow.css";

.ql-snow.ql-toolbar button, .ql-snow .ql-toolbar button {
  width: 36px;
  height: 36px;

  svg {
    width: 100%;
    height: 100%;
  }
}

.ql-snow .ql-picker {
  font-size: 16px !important;
}

.ql-container {
  font-size: 18px;
}
</style>