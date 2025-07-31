import { ref } from 'vue'
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'

export const useDashboardStore = defineStore('dashboard', () => {
  const { t } = useI18n()

  const statistic = ref({
    gateways: 2000,
    activeCodes: 100,
    disabledCodes: 4,
  })

  const navData = computed(() => [
    {
      id: useId(),
      text: t('asideNavScanner'),
      attrs: {
        to: { path: '/scanner' },
      },
    },
    {
      id: useId(),
      text: t('asideNavProfile'),
      attrs: {
        to: { path: '/dashboard' },
      },
    },
    {
      id: useId(),
      text: t('asideNavList'),
      attrs: {
        to: { path: '/qrb-list' },
      },
    },
  ])

  return {
    statistic,
    navData,
  }
})
