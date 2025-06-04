import { useMediaQuery } from '@vueuse/core'
import config from '../../tailwind.config'

type TScreens = '2xl' | 'xl' | 'lg' | 'md' | 'sm'
type TMediaQueries = Record<TScreens, Ref<boolean>>
export const useMediaStore = defineStore('media', () => {
  // // biome-ignore lint: may be wrong type or its bad to use useMediaQuery in computed
  const mediaQueries = computed<TMediaQueries>(() =>
    Object.entries(config.theme.screens).reduce((acc, [key, value]) => {
      const param: any = {}
      param[key] = useMediaQuery(`(min-width: ${value})`)

      return Object.assign(acc, param)
    }, {}),
  )

  return {
    mediaQueries,
  }
})
