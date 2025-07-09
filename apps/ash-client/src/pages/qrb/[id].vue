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
import { ansiToHtml } from '~/utils/ansiToHtml.ts'

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

const qrbTerminal = computed(() => ansiToHtml(qrb.value?.qrCodeTerminal || ''))

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
  <div class="w-full flex flex-wrap gap-5">
    <div class="... col-span-2">
      <PanelCard class="!w-[280px] h-[320px]">
        <pre
            v-html="qrbTerminal"
            class="text-[2px]/[0.8] font-mono tracking-[-0.85px]" style="zoom: 5"
        />
      </PanelCard>
    </div>

    <div class="... col-span-2">
      <PanelCard class="!size-[174px] aspect-square ...">
        <QrbImage
            :src="qrb?.qrCode"
            alt="qrb code"
            class="rounded-xl"
        />
      </PanelCard>
    </div>

    <div class="... col-span-4">
      <PanelCard>
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