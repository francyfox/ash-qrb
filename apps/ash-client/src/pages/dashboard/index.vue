<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '~/stores/dashboard.ts'

definePage({
  meta: {
    layout: 'AdminPanel',
    auth: true,
  },
})

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const dashboardStore = useDashboardStore()
const { statistic } = storeToRefs(dashboardStore)

const logoutHandler = async () => {
  await userStore.signOut()
  await router.push('/auth')
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="relative w-full flex gap-5">
      <div class="flex justify-center">
        <AvatarProfile
            :rating="4"
            :src="user?.image"
            :placeholder="user?.name"
            size="xl"
        />
      </div>

      <WidgetStatistic
          v-bind="statistic"
      />
    </div>

    <div class="relative w-full flex gap-5">
      <WidgetUserInfo
          :name="user.name"
          :id="user.id"
          company="Tri Larka"
          position="Superviser"
          @onLogout="logoutHandler"
      />
    </div>
  </div>
</template>

<style scoped>

</style>