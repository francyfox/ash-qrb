import type { ViteSSGContext } from 'vite-ssg'
import { authMiddleware } from '~/middleware/auth.ts'

export const install = ({ router }: ViteSSGContext) => {
  router.beforeEach(authMiddleware)
}
