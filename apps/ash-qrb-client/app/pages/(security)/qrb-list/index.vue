<script setup lang="ts">
import QrbList from '~/components/ui/table/QrbList.vue'

const { t } = useI18n()
</script>

<template>
  <NuxtLayout name="admin-panel">
    <div class="relative z-10 h-full flex flex-col justify-between gap-5">
      <div class="flex">
        <UButton
            color="primary"
            type="button"
            class="cursor-pointer"
            icon="i-lucide-qr-code"
        >
          {{ t('qrbListAdd') }}
        </UButton>
      </div>

      <QrbList />
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>