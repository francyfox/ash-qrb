import { useMediaQuery } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed } from 'vue'

const screens = {
  sm: '560px',
  md: '768px',
  lg: '1280px',
  xl: '1440px',
  '2xl': '1536px',
}

type TScreens = '2xl' | 'xl' | 'lg' | 'md' | 'sm'
type TMediaQueries = Record<TScreens, Ref<boolean>>
export const useMediaStore = defineStore('media', () => {
  // @ts-ignore
  const mediaQueries = computed<TMediaQueries>(() =>
    Object.entries(screens).reduce((acc, [key, value]) => {
      const param: any = {}
      param[key] = useMediaQuery(`(min-width: ${value})`)

      return Object.assign(acc, param)
    }, {}),
  )

  return {
    mediaQueries,
  }
})
