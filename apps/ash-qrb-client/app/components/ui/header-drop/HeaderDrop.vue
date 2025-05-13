<script setup lang="ts">
const { locale, setLocale } = useI18n()

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
  setLocale(v)
}
</script>

<template>
  <div class="top-0 left-0 flex bg-s-black-olive gap-2 p-2 rounded-md">
    <div class="max-w-[200px]">
      <USelectMenu
          v-model="language"
          :items="languageList"
          icon="i-lucide-languages"
          arrow
          @change="handleChangeLocale"
      />
    </div>
  </div>
</template>

<style scoped>

</style>