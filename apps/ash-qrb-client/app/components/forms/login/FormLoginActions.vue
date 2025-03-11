<script setup lang="ts">
import { useMediaStore } from "~/stores/media";

const { t } = useI18n()
const mediaStore = useMediaStore()
const { mediaQueries } = mediaStore
</script>

<template>
  <div class="form-login-actions flex justify-between items-center gap-2.5">
    <UButton
        variant="solid"
        size="lg"
    >
      <UIcon
          name="i-lucide-rocket"
      />
      
      <span v-show="mediaQueries.md.value">{{ t('formActionSignIn') }}</span>
    </UButton>
    
    <div class="flex items-center gap-2.5 self-stretch">
      <UButton
          variant="solid"
          size="lg"
      >
        <Icon
            name="i-lucide-rocket"
        />

        <span>{{ t('formActionSignIn') }}</span>
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>