import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'
import type { ComponentResolverObject } from 'unplugin-vue-components'
export { default as MenuBurger } from './components/menu-burger/MenuBurger.vue'
export { default as Scanner } from './components/scanner/Scanner.vue'
export { default as WidgetStatistic } from './components/widgets/WidgetStatistic.vue'
export { default as WidgetUserInfo } from './components/widgets/WidgetUserInfo.vue'
export { default as UserId } from './components/user-id/UserId.vue'
export { default as DefaultUploader } from './components/uploader/DefaultUploader.vue'
export { default as QrbList } from './components/table/QrbList.vue'
export { default as QrbImage } from './components/qrb-image/QrbImage.vue'
export { default as QrbEditor } from './components/qrb-editor/QrbEditor.vue'
export { default as NuxtImg } from './components/nuxt-image/NuxtImg.vue'
export { default as AsideNavigation } from './components/nav/aside/AsideNavigation.vue'
export { default as AsideNavigationItem } from './components/nav/aside/AsideNavigationItem.vue'
export { default as MenuPreview } from './components/menu-preview/MenuPreview.vue'
export { default as MenuGenerator } from './components/menu-generator/MenuGenerator.vue'
export { default as HeaderDrop } from './components/header-drop/HeaderDrop.vue'
export { default as DefaultCard } from './components/cards/DefaultCard.vue'
export { default as LightCard } from './components/cards/LightCard.vue'
export { default as PanelCard } from './components/cards/PanelCard.vue'
export { default as AvatarProfile } from './components/avatar/AvatarProfile.vue'
export { default as AvatarSquare } from './components/avatar/AvatarSquare.vue'

export const components = ['MenuBurger','Scanner','WidgetStatistic','WidgetUserInfo','UserId','DefaultUploader','QrbList','QrbImage','QrbEditor','NuxtImg','AsideNavigation','AsideNavigationItem','MenuPreview','MenuGenerator','HeaderDrop','DefaultCard','LightCard','PanelCard','AvatarProfile','AvatarSquare']
export const ashUIResolver: ComponentResolverObject = {
  type: 'component',
  resolve: (name: string) => {
    if (components.includes(name)) return { name, from: 'ash-ui' }
  }
}
export const AshUI = { 
  install: (app: App<Element>) => {
       app.component('MenuBurger', defineAsyncComponent(() => import('./components/menu-burger/MenuBurger.vue')))
   app.component('Scanner', defineAsyncComponent(() => import('./components/scanner/Scanner.vue')))
   app.component('WidgetStatistic', defineAsyncComponent(() => import('./components/widgets/WidgetStatistic.vue')))
   app.component('WidgetUserInfo', defineAsyncComponent(() => import('./components/widgets/WidgetUserInfo.vue')))
   app.component('UserId', defineAsyncComponent(() => import('./components/user-id/UserId.vue')))
   app.component('DefaultUploader', defineAsyncComponent(() => import('./components/uploader/DefaultUploader.vue')))
   app.component('QrbList', defineAsyncComponent(() => import('./components/table/QrbList.vue')))
   app.component('QrbImage', defineAsyncComponent(() => import('./components/qrb-image/QrbImage.vue')))
   app.component('QrbEditor', defineAsyncComponent(() => import('./components/qrb-editor/QrbEditor.vue')))
   app.component('NuxtImg', defineAsyncComponent(() => import('./components/nuxt-image/NuxtImg.vue')))
   app.component('AsideNavigation', defineAsyncComponent(() => import('./components/nav/aside/AsideNavigation.vue')))
   app.component('AsideNavigationItem', defineAsyncComponent(() => import('./components/nav/aside/AsideNavigationItem.vue')))
   app.component('MenuPreview', defineAsyncComponent(() => import('./components/menu-preview/MenuPreview.vue')))
   app.component('MenuGenerator', defineAsyncComponent(() => import('./components/menu-generator/MenuGenerator.vue')))
   app.component('HeaderDrop', defineAsyncComponent(() => import('./components/header-drop/HeaderDrop.vue')))
   app.component('DefaultCard', defineAsyncComponent(() => import('./components/cards/DefaultCard.vue')))
   app.component('LightCard', defineAsyncComponent(() => import('./components/cards/LightCard.vue')))
   app.component('PanelCard', defineAsyncComponent(() => import('./components/cards/PanelCard.vue')))
   app.component('AvatarProfile', defineAsyncComponent(() => import('./components/avatar/AvatarProfile.vue')))
   app.component('AvatarSquare', defineAsyncComponent(() => import('./components/avatar/AvatarSquare.vue')))

  }
}
