# QRB Plugins

Plugin validator example

![qrb](./assets/qrb.webp)

For creating plugin system need special modules for each app.
In package will create cli tool `ash-cli`.
You ought to use npm for plugin installation.

```shell
bunx run plugin-install <npm-package-name>
```

Or manual install by folder inserting `packages/ash-cli/plugins` and command install

```shell
bunx run plugin-install
```

## Plugin structure

For plugin creation you ought to use special vite template

```shell
vite create ash-plugin
```

### client app

#### Extend client app
**_high compatibility plugin (can use few plugins together)_**
`packages/plugin-client/src/slots`

- footerBodyFormModalCreate - extend form
- footerBodyModalSuccess - extend success message
- extendQrbSettings.ts - extend qrb menu (part of h render function)
- extendQrbTable.ts - add rows and cols in qrb list table

`packages/plugin-client/src/replace`

**_low compatibility plugin_**

- modalCreate - replace form create QRB
- modalSuccess - replace success form QRB
- modalSettings - replace settings menu
- QRBList - replace qrb table

#### Extend server app `packages/plugin-server/`

- `sсhema` - drizzle схема
- `routes/plugin/<plugin-name>/*` - роуты

#### Extend CLI tool `packages/plugin-cli`

- `commands/<name>` - extend commands