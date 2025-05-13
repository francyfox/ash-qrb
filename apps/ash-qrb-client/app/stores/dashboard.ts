export const useDashboardStore = defineStore('dashboard', () => {
  const statistic = ref({
    gateways: 2000,
    activeCodes: 100,
    disabledCodes: 4,
  })

  return {
    statistic,
  }
})
