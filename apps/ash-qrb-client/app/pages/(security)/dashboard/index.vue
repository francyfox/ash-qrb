<script setup lang="ts">
import AvatarProfile from '~/components/ui/avatar/AvatarProfile.vue'
import AvatarSquare from '~/components/ui/avatar/AvatarSquare.vue'
import { authClient } from '~/libs/auth-client'

definePageMeta({
  middleware: ['auth'],
})

const session = authClient.useSession()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <NuxtLayout name="admin-panel">
    <div class="flex">
      <AvatarProfile
          :rating="4"
          :src="user?.image"
          :placeholder="user?.name"
          size="xl"
      />
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>