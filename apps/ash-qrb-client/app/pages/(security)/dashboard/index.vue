<script setup lang="ts">
import { authClient } from '~/libs/auth-client'

definePageMeta({
  middleware: ['auth'],
})

const session = authClient.useSession()
</script>

<template>
  <NuxtLayout name="admin-panel">

  </NuxtLayout>
</template>

<style scoped>

</style>