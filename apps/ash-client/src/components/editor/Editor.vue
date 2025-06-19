<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import BlotFormatter from 'quill-blot-formatter'
import imageUploader from 'quill-image-uploader'

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

const test = { ops: [{ insert: 'ffff\n' }] }
</script>

<template>
  <QrbEditor
      v-bind="{ modules, ...$attrs }"
      :content="test"
  />
</template>

<style scoped>

</style>