<script setup lang="ts">
import Editor from "~lib/components/editor/Editor.vue";
import {ref} from "vue";

const test = ref()
</script>

<template>
  <UApp>
    <div class="py-5 mx-auto flex flex-col max-w-2xl">
      <Editor
          v-model="test"
      />
    </div>
  </UApp>
</template>

<style scoped>

</style>