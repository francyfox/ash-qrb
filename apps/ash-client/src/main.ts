import devalue from '@nuxt/devalue'
import { ViteSSG } from 'vite-ssg'
import routes from '~pages'
import App from './App.vue'
import '~/assets/styles/styles.pcss'
import '~/assets/styles/tailwind.pcss'

export const createApp = ViteSSG(
  App,
  {
    base: import.meta.env.BASE_URL,
    routes,
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
