<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'
import { ref, onMounted, computed } from 'vue'
import { isExternalUrl, isValidHttpUrl } from '~/utils/url.ts'

const { t } = useI18n()

const { providers, linkRegex = '' } = defineProps<{
  providers: any
  linkRegex: string
}>()

const { toast } = providers

const emit = defineEmits<{
  onDetect: [code: string, external: boolean]
}>()

const torchActive = ref(false)
const torchNotSupported = ref(false)
const selected = ref(null as MediaDeviceInfo | null)
const devices = ref([] as MediaDeviceInfo[])
const captured = ref()
const result = ref('')

const isExternal = computed(
  () => isValidHttpUrl(result.value) && isExternalUrl(result.value, linkRegex),
)

function paintBoundingBox(detectedCodes: any[], ctx: CanvasRenderingContext2D) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode

    ctx.lineWidth = 1
    ctx.strokeStyle = '#e85c31'
    ctx.roundRect(x, y, width, height, 10)
    ctx.fillStyle = 'rgba(232,135,49,0.3)'
    ctx.font = 'italic 12px sans-serif'
    ctx.strokeText(detectedCode.rawValue, x - 10, y - 5)
    ctx.fill()
    ctx.stroke()
  }
}

function onCameraOn(capabilities: any) {
  torchNotSupported.value = !capabilities.torch
}

function handleError(error: any) {
  toast.add({
    color: 'error',
    title: errorMessage(error),
  })
}

const errorMessage = (error: any) => {
  switch (error.name) {
    case 'NotAllowedError':
      return t('scannerNotAllowedError')
    case 'NotFoundError':
      return t('scannerNotFoundError')
    case 'NotSupportedError':
      return t('scannerNotSupportedError')
    case 'NotReadableError':
      return t('scannerNotReadableError')
    case 'OverconstrainedError':
      return t('scannerOverconstrainedError')
    case 'StreamApiNotSupportedError':
      return t('scannerStreamApiNotSupportedError')
    case 'InsecureContextError':
      return t('scannerInsecureContextError')
    default:
      return error.message
  }
}

function handleDetect([firstDetectedCode]: any) {
  const code = firstDetectedCode.rawValue
  result.value = code

  if (!isValidHttpUrl(code)) {
    toast.add({
      color: 'error',
      title: t('snannerUrlNotValid'),
    })

    return
  }
  emit('onDetect', code, isExternal.value)
}

onMounted(() => {
  setTimeout(async () => {
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices()
    devices.value = enumerateDevices.filter(({ kind }) => kind === 'videoinput')

    if (devices.value.length > 0) {
      selected.value = devices.value[0]
    }
  }, 100)
})
</script>

<template>
  <div class="scanner flex flex-col gap-2">
    <div class="relative">
      <div class="scanner-camera z-10 absolute top-2 left-2 flex gap-2">
        <UButton
            variant="soft"
            :icon="torchActive ? 'i-lucide-flashlight' : 'i-lucide-flashlight-off'"
            :disabled="torchNotSupported"
            @click="torchActive = !torchActive"
        />
        <USelectMenu
            v-model="selected"
            :items="devices"
            :searchInput="false"
            variant="soft"
            icon="i-lucide-camera"
            size="xl"
            arrow
            class="lg:text-lg text-sm max-w-[280px]"
        />
      </div>
      <div class="scanner-item overflow-hidden rounded-2xl">
        <QrcodeStream
            @detect="handleDetect"
            @error="handleError"
            @camera-on="onCameraOn"
            :torch="torchActive"
            :track="paintBoundingBox"
            v-memo="[torchActive, selected?.deviceId]"
            class="w-full h-full"
        />
<!--                 :constraints="{ deviceId: selected?.deviceId }" -->
      </div>
    </div>
    <div class="scanner-upload flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-qr-code" class="p-1 w-[40px] h-[40px] bg-p-middle-red text-white rounded-lg" />
        <QrcodeCapture
            @detect="handleDetect"
            :capture="captured"
            class="cursor-pointer w-full bg-p-middle-red hover:bg-p-middle-red/70 text-white p-2 rounded-lg transition-colors"
        />
      </div>

      <Transition>
        <div v-if="result" class="scanner-upload-result flex flex-col gap-1">
          Scanned qr: <b>{{ result }}</b>

          <div class="flex items-center gap-2">
            <UIcon
                name="i-lucide-square-arrow-out-up-right"
            />

            <a
                v-if="isExternal"
                :href="result"
                target="_blank"
                rel="noopener noreferrer"
            >
              {{ t('scannerGoToPage') }}
            </a>
            <RouterLink
                v-else
                :to="result"
            >
              {{ t('scannerGoToPage') }}
            </RouterLink>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>

</style>