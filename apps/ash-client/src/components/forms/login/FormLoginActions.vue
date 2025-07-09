<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useMediaStore } from '~/stores/media'

const { t } = useI18n()

const emit = defineEmits<{
  onSubmit: []
}>()

const mediaStore = useMediaStore()
const { mediaQueries } = mediaStore
</script>

<template>
  <div class="form-login-actions w-full flex justify-between items-center gap-2.5">
    <UButton
        color="primary"
        type="button"
        class="cursor-pointer"
        icon="i-lucide-rocket"
        @click="emit('onSubmit')"
    >
      <span>{{ t('formActionSignIn') }}</span>
    </UButton>
    
    <div class="flex items-center gap-2.5 self-stretch">
      <UButton
          variant="solid"
          icon="i-lucide-user-plus"
          to="/sign-up"
      >
        <span v-show="mediaQueries.sm.value">{{ t('formActionSignUp') }}</span>
      </UButton>

      <UButton
          color="secondary"
          icon="i-lucide-book-lock"
      >
        <span v-show="mediaQueries.sm.value">{{ t('formActionForgot') }}</span>
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>