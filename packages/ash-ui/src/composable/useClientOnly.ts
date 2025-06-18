import { h, defineComponent } from 'vue';

const isBrowser = typeof window !== 'undefined';

export function useClientOnly(asyncComponent: any) {
  return defineComponent({
    setup(props, context) {
      return () => isBrowser ? h(asyncComponent, { ...props, ...context.attrs }) : h('div')
    }
  })
}