<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '~/stores/dashboard.ts'

definePage({
  meta: {
    layout: 'AdminPanel',
    auth: true,
  },
})

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

console.log(user.value)

const dashboardStore = useDashboardStore()
const { statistic } = storeToRefs(dashboardStore)
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
      />
    </div>
  </div>
</template>

<style scoped>

</style>