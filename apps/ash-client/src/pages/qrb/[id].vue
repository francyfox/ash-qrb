<route lang="yaml">
meta:
  layout: QrbBadge
</route>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

definePage({
  meta: {
    layout: 'QrbBadge',
  },
})

const { t } = useI18n()
const route = useRoute()

const qrbStore = useQrbStore()
const { qrb } = storeToRefs(qrbStore)
const id = route.params?.id

if (id) {
  const { error } = await qrbStore.getQrbById(route.params?.id)

  if (error) {
    // showError({
    //   statusCode: 500,
    //   statusMessage: error?.summary || error,
    // })
  }
} else {
  // showError({
  //   statusCode: 404,
  //   statusMessage: 'Page Not Found',
  // })
}
</script>

<template>
  <NuxtLayout name="qrb-badge">
    <PanelCard class="max-w-[174px]">
      <QrbImage
          :src="qrb?.qrCode"
          alt="qrb code"
          class="rounded-xl"
      />
    </PanelCard>

    <PanelCard class="max-w-1/4">
      <h1 class="text-3xl text-center uppercase mb-2">
        {{ qrb?.name }}
      </h1>

      <UserId :id="qrb?.userId" />

      <main>
        <p class="text-xl">
          {{ qrb?.description }}
        </p>
      </main>
    </PanelCard>
  </NuxtLayout>
</template>

<style scoped>

</style>