import { h, defineComponent } from 'vue';

const isBrowser = !import.meta.env.SSR;

export function useClientOnly(asyncComponent: any) {
  return defineComponent({
    setup(props, context) {
      return () => isBrowser ? h(asyncComponent, { ...props, ...context.attrs }) : h('div')
    }
  })
}