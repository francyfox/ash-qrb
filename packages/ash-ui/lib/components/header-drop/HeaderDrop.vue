<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MenuBurger from '../menu-burger/MenuBurger.vue'
import type { AsideNavigationProps } from '../nav/aside/AsideNavigation.vue'

const { locale } = useI18n()
const { data } = defineProps<AsideNavigationProps>()

const openBurger = defineModel<boolean>('openBurger', { default: false })

const languageList = [
  {
    label: 'Русский',
    value: 'ru',
  },
  {
    label: 'English',
    value: 'en',
  },
]

const currentLanguage = languageList.find((i) => locale.value === i.value)
const language = ref(currentLanguage)
const handleChangeLocale = () => {
  const v = language.value?.value as 'en' | 'ru'
  locale.value = v
}
</script>

<template>
  <div class="top-0 left-0 flex bg-s-black-olive gap-2 p-2 rounded-b-md">
    <MenuBurger v-model="openBurger" v-bind="{ data }" />

    <div class="max-w-[200px]">
      <USelectMenu
          v-model="language"
          :items="languageList"
          icon="i-lucide-languages"
          size="xl"
          arrow
          @change="handleChangeLocale"
      />
    </div>
  </div>
</template>

<style scoped>

</style>