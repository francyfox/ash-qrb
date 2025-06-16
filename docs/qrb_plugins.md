# QRB Plugins

Пример плагина валидатора

![qrb](./assets/qrb.webp)

Для создания плагина необходимо 
модуль для подключения плагинов на фронт и бэк.
В package создается cli tool `ash-cli`.
Для установки плагина необходимо скачать плагин из npm 

```shell
bunx run plugin-install <npm-package-name>
```

Или ручной устоновкой через добавление 
в `packages/ash-cli/plugins` и командой запустить установку

```shell
bunx run plugin-install
```

## Структура плагина

Для создания требуется создать package через vite

```shell
vite create ash-plugin
```

Плагин должен позволять расширять функционал всех приложений из `/app`

### client app

#### Расширение функционала клиента через папку
`packages/plugin-client/src/slots`

- modalCreate - реплейс формы создания QRB
- modalSuccess - реплейс формы после отправки QRB
- modalSettings - реплейс меню настроек
- QRBList - реплейс таблицы списка

#### Расширение функционала сервера `packages/plugin-server/`

- `sсhema` - drizzle схема
- `routes/plugin/<plugin-name>/*` - роуты

#### Расширение функционала `packages/plugin-cli`

- 