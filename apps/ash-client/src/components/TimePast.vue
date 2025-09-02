<script setup lang="ts">
import { useDayjs } from 'ash-libs'
import { useI18n } from 'vue-i18n'

const dayjs = useDayjs()
const { t } = useI18n()

const { timestamp } = defineProps<{
  timestamp: number
}>()

const time = (timestamp: number) => {
  if (timestamp === 0) return 'null'
  const diff = dayjs(timestamp).diff(new Date().getTime(), 'second')
  console.log(diff)

  if (diff <= -86400)
    return `${dayjs(timestamp).diff(new Date().getTime(), 'day')} ${t('timeDays')}`
  if (diff <= -3600)
    return `${dayjs(timestamp).diff(new Date().getTime(), 'hour')} ${t('timeHours')}`
  if (diff <= -60)
    return `${dayjs(timestamp).diff(new Date().getTime(), 'minute')} ${t('timeMinutes')}`

  return `${dayjs(timestamp).diff(new Date().getTime(), 'second')} ${t('timeSeconds')}`
}
</script>

<template>
  <div class="time-past flex items-center gap-2">
    <span>
      {{ time(timestamp) }}
    </span>

    <UTooltip v-if="timestamp">
      <UButton icon="i-lucide-square-arrow-down" color="neutral" variant="subtle" size="sm" />

      <template #content>
        {{ dayjs(timestamp).format('DD-MM-YYYY HH:mm') }}
      </template>
    </UTooltip>
  </div>
</template>

<style scoped>

</style>