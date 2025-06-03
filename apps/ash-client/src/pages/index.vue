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
  <div class="">
    <div class="container">
      <DefaultCard title="">ff</DefaultCard>
      <IAshApple />
      <ILucideAirplay />
      <h1 class="text-p-fawn text-5xl">ted {{ tt }}</h1>
      {{ t('actionDisable')}}
      <router-link to="/test">TEST</router-link>

      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>

</style>
