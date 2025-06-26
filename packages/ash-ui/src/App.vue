<script setup lang="ts">
// import Editor from "~lib/components/qrb-editor/QrbEditor.vue";
import QrbEditor from "~lib/components/qrb-editor/QrbEditor.vue";
import {ref} from "vue";

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
  <UApp>
    <div class="py-5 mx-auto flex flex-col max-w-2xl">
      <QrbEditor v-model="test" />
<!--      <Editor-->
<!--          v-model="test"-->
<!--      />-->
      {{ test }}
    </div>
  </UApp>
</template>

<style scoped>

</style>