import { defineAsyncComponent, h } from 'vue'

export const useEditor = () =>
  !import.meta.env.SSR
    ? defineAsyncComponent(() => import('~/components/editor/Editor.vue'))
    : h('div')
