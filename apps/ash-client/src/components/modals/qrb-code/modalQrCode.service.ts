import { useQrbStore } from '~/stores/qrb.ts'
import type { ComposerTranslation } from 'vue-i18n'
import type { Ref } from 'vue'

export async function createQrb({
  text,
  v,
  t,
}: {
  text: Ref<object>
  v: any
  t: ComposerTranslation
}) {
  const toast = useToast()
  const qrbStore = useQrbStore()

  const { error } = await qrbStore.postQrb({
    qrb: { ...v, body: text.value },
  })

  if (error) {
    toast.add({
      title: error.message || 'error',
      description: error?.summary || error,
      color: 'error',
    })
  } else {
    toast.add({
      title: t('toastQrCreated'),
      color: 'success',
    })
  }
}

export async function updateQrbCode({
  id,
  text,
  v,
  t,
}: { id: string; text: Ref<object>; v: any; t: ComposerTranslation }) {
  const toast = useToast()
  const qrbStore = useQrbStore()

  const { error } = await qrbStore.updateQrb(id, {
    qrb: { ...v, body: text.value },
  })

  if (error) {
    toast.add({
      title: error.message || 'error',
      description: error?.summary || error,
      color: 'error',
    })
  } else {
    toast.add({
      title: t('toastQrUpdated', { id }),
      color: 'success',
    })
  }
}
