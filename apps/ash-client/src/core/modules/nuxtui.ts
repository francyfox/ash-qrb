import ui from '@nuxt/ui/vue-plugin'
import type { ViteSSGContext } from 'vite-ssg'

export const install = ({ app }: ViteSSGContext) => {
  app.use(ui)
}
