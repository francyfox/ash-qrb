<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { animateNumber } from '../../../src/utils/animateNumber'
import { formatIntNumber } from '../../../src/utils/format'

const { t } = useI18n()

const props = defineProps<{
  gateways: number
  activeCodes: number
  disabledCodes: number
}>()

const animatedGateways = animateNumber(props.gateways)
const animatedActiveCodes = animateNumber(props.activeCodes)
const animatedDisabledCodes = animateNumber(props.disabledCodes)
</script>

<template>
  <ClientOnly>
    <div class="flex flex-col justify-center text-s-black-olive gap-1">
      <div class="flex flex-col">
        <div class="text-6xl">
          {{ formatIntNumber(animatedGateways) }}
        </div>

        <div class="text-xl">
          {{ t('userGateways') }}
        </div>
      </div>

      <div class="flex items-center gap-1.5">
        <div class="text-3xl">
          {{ formatIntNumber(animatedActiveCodes) }}
        </div>

        <div class="text-md">
          {{ t('userActiveCodes') }}
        </div>
      </div>

      <div class="flex items-center gap-1.5">
        <div class="text-3xl">
          {{ formatIntNumber(animatedDisabledCodes) }}
        </div>

        <div class="text-md">
          {{ t('userDisabledCodes') }}
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>