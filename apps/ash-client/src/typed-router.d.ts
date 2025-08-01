/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/auth/': RouteRecordInfo<'/auth/', '/auth', Record<never, never>, Record<never, never>>,
    '/dashboard/': RouteRecordInfo<'/dashboard/', '/dashboard', Record<never, never>, Record<never, never>>,
    '/error': RouteRecordInfo<'/error', '/error', Record<never, never>, Record<never, never>>,
    '/profile/': RouteRecordInfo<'/profile/', '/profile', Record<never, never>, Record<never, never>>,
    '/qrb/[id]': RouteRecordInfo<'/qrb/[id]', '/qrb/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/qrb-list/': RouteRecordInfo<'/qrb-list/', '/qrb-list', Record<never, never>, Record<never, never>>,
    '/scanner/': RouteRecordInfo<'/scanner/', '/scanner', Record<never, never>, Record<never, never>>,
    '/sign-up/': RouteRecordInfo<'/sign-up/', '/sign-up', Record<never, never>, Record<never, never>>,
  }
}
