import { useStorage } from '@vueuse/core'
import messages from 'ash-i18n'
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
