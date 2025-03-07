<script setup lang="ts">
const { t } = useI18n()
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
      
      <span>{{ t('formActionSignIn') }}</span>
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