import { createPinia } from 'pinia'
import type { ViteSSGContext } from 'vite-ssg'

export const install = ({ app, initialState }: ViteSSGContext) => {
  const pinia = createPinia()
  app.use(pinia)

  if (import.meta.env.SSR) {
    initialState.pinia = pinia.state.value
  } else {
    pinia.state.value = initialState?.pinia || {}
  }
}
