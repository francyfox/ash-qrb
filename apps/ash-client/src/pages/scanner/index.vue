<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePage({
  meta: {
    layout: 'AdminPanel',
    auth: true,
  },
})

const toast = useToast()

const router = useRouter()
const showModal = ref(false)
const url = ref('')

const providers = {
  toast,
}

function handleDetect(code: string, external: boolean) {
  url.value = code
  console.log(external)

  if (external) {
    showModal.value = true
  } else {
    const { pathname } = new URL(code)
    router.push(pathname)
  }
}
</script>

<template>
  <section class="section-scanner">
    <div class="container">
      <div class="flex flex-col items-center gap-5">
        <div class="w-full max-w-[600px]">
          <Scanner
              v-bind="{ providers }"
              @onDetect="handleDetect"
          />
        </div>
      </div>
    </div>

    <ModalExternalResource
        v-model="showModal"
        :url="url"
    />
  </section>
</template>

<style scoped>

</style>