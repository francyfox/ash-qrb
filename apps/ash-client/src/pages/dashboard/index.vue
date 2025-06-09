<script setup lang="ts">
import AvatarProfile from '~/components/ui/avatar/AvatarProfile.vue'
import WidgetStatistic from '~/components/ui/widgets/WidgetStatistic.vue'
import WidgetUserInfo from '~/components/ui/widgets/WidgetUserInfo.vue'
import { useDashboardStore } from '~/stores/dashboard.ts'

definePageMeta({
  middleware: ['auth'],
})

const { t } = useI18n()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const dashboardStore = useDashboardStore()
const { statistic } = storeToRefs(dashboardStore)
</script>

<template>
  <NuxtLayout name="admin-panel">
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
  </NuxtLayout>
</template>

<style scoped>

</style>