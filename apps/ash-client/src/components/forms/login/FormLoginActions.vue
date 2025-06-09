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
        @click="emit('onSubmit')"
    >
      <UIcon
          name="i-lucide-rocket"
          :size="20"
      />
      
      <span>{{ t('formActionSignIn') }}</span>
    </UButton>
    
    <div class="flex items-center gap-2.5 self-stretch">
      <UButton
          variant="solid"
          to="/sign-up"
      >
        <Icon
            name="i-lucide-user-plus"
            :size="20"
        />

        <span v-show="mediaQueries.sm.value">{{ t('formActionSignUp') }}</span>
      </UButton>

      <UButton
          color="secondary"
      >
        <Icon
            name="i-lucide-book-lock"
            :size="20"
        />

        <span v-show="mediaQueries.sm.value">{{ t('formActionForgot') }}</span>
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>