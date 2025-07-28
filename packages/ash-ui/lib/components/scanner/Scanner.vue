<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'
import { ref, onMounted } from 'vue'

const { t } = useI18n()

const { providers } = defineProps<{
  providers: any
}>()

const { toast } = providers

const emit = defineEmits<{
  onDetect: [code: string]
}>()

const torchActive = ref(false)
const torchNotSupported = ref(false)
const selected = ref(null as MediaDeviceInfo | null)
const devices = ref([] as MediaDeviceInfo[])
const captured = ref()
const result = ref('')

function paintBoundingBox(detectedCodes: any[], ctx: CanvasRenderingContext2D) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}

function onCameraOn(capabilities) {
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

function handleDetect(v: any) {
  try {
    const code = JSON.stringify(v.map((code: any) => code.rawValue))
    result.value = code
    emit('onDetect', code)
  } catch (e: any) {
    throw new Error(`Couldnt stringify detectedCodes ${e.message}`)
  }
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
            variant="soft"
            icon="i-lucide-camera"
            :searchInput="false"
            size="xl"
            arrow
        />
      </div>
      <div class="scanner-item overflow-hidden rounded-2xl">
        <QrcodeStream
            :constraints="{ deviceId: selected?.deviceId }"
            :torch="torchActive"
            :track="paintBoundingBox"
            @detect="handleDetect"
            @error="handleError"
            @camera-on="onCameraOn"
            v-memo="[torchActive, selected?.deviceId]"
            class="w-full h-full"
        />
      </div>
    </div>
    <div class="scanner-upload">
      <Transition>
        <div v-if="result" class="scanner-upload-result">
          Scanned qr: <b>{{ result[0] }}</b>

          <UButton
              as="a"
              icon="i-lucide-square-arrow-out-up-right"
              :to="result[0]"
          >
            {{ t('scannerGoToPage') }}
          </UButton>
        </div>
      </Transition>

      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-qr-code" class="p-1 w-[40px] h-[40px] bg-p-middle-red text-white rounded-lg" />
        <QrcodeCapture
            @detect="handleDetect"
            :capture="captured"
            class="cursor-pointer bg-p-middle-red hover:bg-p-middle-red/70 text-white p-2 rounded-lg transition-colors"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>