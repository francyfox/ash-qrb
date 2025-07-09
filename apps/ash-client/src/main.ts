import { setupLayouts } from 'virtual:generated-layouts'
import devalue from '@nuxt/devalue'
import { ViteSSG } from 'vite-ssg'
import { routes as autoRoutes } from 'vue-router/auto-routes'
import ErrorPage from '~/pages/error.vue'
import App from './App.vue'
import './index.css'
// @ts-ignore
import '@fontsource-variable/sofia-sans'
import '~/assets/styles/nprogress.css'

const routes = [
  ...autoRoutes,
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage,
  },
]

for (const route of routes) {
  route.meta ??= {}
  route.meta.layout = 'default'
  route.meta.auth = false
}

export const createApp = ViteSSG(
  App,
  {
    base: import.meta.env.BASE_URL,
    routes: setupLayouts(routes),
  },
  (ctx) => {
    const modules: { install: (ctx: any) => void }[] = Object.values(
      import.meta.glob('~/core/modules/*.ts', {
        eager: true,
      }),
    )

    for (const module of modules) {
      module.install?.(ctx)
    }
  },
  {
    transformState(state) {
      return import.meta.env.SSR ? devalue(state) : state
    },
  },
)
