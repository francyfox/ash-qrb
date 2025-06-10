<route format="yaml">

</route>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useDashboardStore } from '~/stores/dashboard.ts'

const { t } = useI18n()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const dashboardStore = useDashboardStore()
const { statistic } = storeToRefs(dashboardStore)
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="relative w-full flex gap-5 z-10">
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

    <div class="relative w-full flex gap-5 z-10">
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