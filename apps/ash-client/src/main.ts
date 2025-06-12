import { setupLayouts } from 'virtual:generated-layouts'
import devalue from '@nuxt/devalue'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import ErrorPage from '~/pages/error.vue'
import App from './App.vue'
import './index.css'
import '@fontsource-variable/sofia-sans'

export const createApp = ViteSSG(
  App,
  {
    base: import.meta.env.BASE_URL,
    routes: setupLayouts([
      ...routes,
      {
        path: '/:pathMatch(.*)*',
        component: ErrorPage,
      },
    ]),
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
