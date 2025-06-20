<route lang="yaml">
meta:
  layout: QrbBadge
</route>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { QRB_STATUS } from '~/components/forms/qr/qr.schema'
import { deltaToHtml } from '~/utils/delta.ts'

definePage({
  meta: {
    layout: 'QrbBadge',
  },
})

const { t, locale } = useI18n()
const route = useRoute()

const qrbStore = useQrbStore()
const { qrb } = storeToRefs(qrbStore)
const id = route.params?.id

const isDisabled = computed(() => qrb.value.string === QRB_STATUS.DISABLED)

const description = computed(() => {
  const currentLocale = qrb.value.body[locale.value] ? locale.value : 'en'
  if (!currentLocale) return ''

  return deltaToHtml(qrb.value.body[currentLocale]?.ops)
})

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
  <div class="w-full flex flex-col gap-2">
    <PanelCard class="max-w-[174px]">
      <QrbImage
          :src="qrb?.qrCode"
          alt="qrb code"
          class="rounded-xl"
      />
    </PanelCard>

    <PanelCard class="max-w-1/2">
      <div class="flex flex-col gap-2 mb-5">
        <div class="flex items-center gap-2">
          <UButton
              v-if="isDisabled"
              color="error"
              variant="soft"
              size="xl"
          >
            {{ t('statusDisabled') }}
          </UButton>
          <h1 class="text-4xl uppercase">
            {{ qrb?.name }}
          </h1>
        </div>


        <i v-if="isDisabled" class="text-s-purple-taupe">
          *{{ t('disableQrCaption') }}
        </i>
      </div>

      <UserId :id="qrb?.userId" />

      <main v-html="description" />
    </PanelCard>
  </div>
</template>

<style lang="postcss">
main {
  h1 {
    @apply text-3xl;
  }

  h2 {
    @apply text-2xl;
  }
}
</style>