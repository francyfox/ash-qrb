<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import HelloWorld from '~/components/HelloWorld.vue'
import { useTestStore } from '~/stores/test.ts'

useHead({
  title: 'Website Title',
  meta: [
    {
      name: 'description',
      content: 'Website description',
    },
  ],
})

const store = useTestStore()
const { tt } = storeToRefs(store)
const { t } = useI18n()
</script>

<template>
  <div>
    <IAshApple />
    <ILucideAirplay />
    <h1>ted {{ tt }}</h1>
    {{ t('actionDisable')}}
    <router-link to="/test">TEST</router-link>

    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
