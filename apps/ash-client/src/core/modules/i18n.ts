import messages from '@intlify/unplugin-vue-i18n/messages'
import { useStorage } from '@vueuse/core'
import type { ViteSSGContext } from 'vite-ssg'
import { createI18n } from 'vue-i18n'

export const install = ({ app }: ViteSSGContext) => {
  const defaultLocale = useStorage('locale', 'en')

  const i18n = createI18n({
    locale: defaultLocale.value,
    messages,
  })

  app.use(i18n)
}
