<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import BlotFormatter from 'quill-blot-formatter'
import imageUploader from 'quill-image-uploader'
import { ref } from 'vue'

const modules = [
  {
    name: 'imageUploader',
    module: imageUploader,
    options: {},
  },
  {
    name: 'BlotFormatter',
    module: BlotFormatter,
  },
]

const test = ref()
</script>

<template>
  <QrbEditor
      v-bind="{ modules }"
      v-model="test"
  />

  {{ test }}
</template>

<style scoped>

</style>