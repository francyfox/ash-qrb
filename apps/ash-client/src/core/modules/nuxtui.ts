import ui from '@nuxt/ui/vue-plugin'
import type { ViteSSGContext } from 'vite-ssg'

export const install = ({ app }: ViteSSGContext) => {
  if (!import.meta.env.SSR) {
    app.use(ui)
  }
}
