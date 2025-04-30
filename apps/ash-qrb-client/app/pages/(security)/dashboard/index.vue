<script setup lang="ts">
import { authClient } from '~/libs/auth-client'

definePageMeta({
  middleware: ['auth'],
})

const session = authClient.useSession()
</script>

<template>
  <div class="text-4xl text-white text-center">
    WELCOME {{ session.data?.user?.email }}
    
    <button v-if="session.data" @click="authClient.signOut()">
      Sign out
    </button>
  </div>
</template>

<style scoped>

</style>