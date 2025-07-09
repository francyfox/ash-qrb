# ASH-QRB client
### based on ViteSSE boilerplate

- [x] auto import for
- - icons in `~/assets/icons` ([unplugin-icons/vite](https://github.com/unplugin/unplugin-icons)) like `<AshIApple />`or manual `import IconApple from '~icons/ash/apple'`
- - composables ([unheadVueComposablesImports](https://unhead.unjs.io/docs/head/guides/advanced/extending-unhead#creating-custom-composables))
- - layouts ([vite-plugin-vue-layouts](https://github.com/johncampionjr/vite-plugin-vue-layouts))
- - pages, nuxt like routing ([vite-plugin-pages](github.com/hannoeru/vite-plugin-pages))
- - core modules in `~/core/modules`. Use for installing vue plugins or SSG modules
- - pinia stores in `~/stores`
- - [nuxt ui](https://ui.nuxt.com/getting-started/installation/vue)
- [x] `~/middleware` use middleware fn and install in `App.vue`
- [x] `~root/config.ts` - secured env vars
- [x] `bun run generate:schema` convert api specs to `~/assets/schema.ts` file
- [x] [openapi-fetch](https://openapi-ts.dev/openapi-fetch/) use typed fetch client

### packages

- [x] `ash-ui` package for local ui kit (only ui without business logic)
- [x] `ash-i18n` use with plugins aka easy-i18n to localise ([vue-i18n](https://vue-i18n.intlify.dev/guide/introduction.html))
- [x] `ash-linter` for [biomejs](https://biomejs.dev/guides/getting-started/) configuration. **USE FORMATTER ON SAVE!**
