<script setup lang="ts">
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
</script>

<template>
  <QrbEditor
      v-bind="{ modules, ...$attrs }"
  />
</template>

<style scoped>

</style>