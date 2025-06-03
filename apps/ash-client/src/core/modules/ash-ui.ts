import { AshUI } from 'ash-ui'
import type { ViteSSGContext } from 'vite-ssg'

export const install = ({ app }: ViteSSGContext) => {
  app.use(AshUI)
}
