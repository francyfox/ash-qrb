```vue
<script lang="ts" setup>
  import 'ash-ui/assets/QrbEditor.css'
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
  
  const test = ref({
    "en": {
      "ops": [
        {
          "insert": "test"
        }
      ]
    }
  })
</script>
<template>
  <QrbEditor 
      v-bind="{ modules }"
      v-model="test"
  />
</template>

```