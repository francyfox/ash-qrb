<script setup lang="ts">
import { useRouter } from 'vue-router'
import { authMiddleware } from '~/middleware/auth.ts'

const router = useRouter()
router.beforeEach(authMiddleware)
</script>
<template>
  <UApp>
    <RouterView v-slot="{ Component, route }">
      <Component :is="Component" :key="route" />
    </RouterView>
  </UApp>
</template>