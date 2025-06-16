import NProgress from 'nprogress'
import type { ViteSSGContext } from 'vite-ssg'

export const install = ({ router, routes, head }: ViteSSGContext) => {
  console.log(router)
  if (!import.meta.env.SSR) {
    NProgress.configure({ easing: 'ease', speed: 500 })

    router.beforeEach((to, from) => {
      if (to.path !== from.path) NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }
}
