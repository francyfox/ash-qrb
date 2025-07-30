import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import messages from 'ash-i18n'

const app = createApp(App)


const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  messages,
})

app.use(i18n)
app.mount('#app')