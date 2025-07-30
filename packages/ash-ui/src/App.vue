<script setup lang="ts">
import { useToast } from '#ui/composables/useToast'
import { ref } from 'vue';
import Scanner from '~lib/components/scanner/Scanner.vue'

const providers = {
  toast: {}
}

const test = (v: string) => {
  console.log(v)
}
</script>

<template>
  <UApp>
    <div class="py-5 mx-auto flex flex-col max-w-2xl">
      <Scanner
          :providers="providers"
          @onDetect="test"
      />
    </div>
  </UApp>
</template>

<style scoped>

</style>