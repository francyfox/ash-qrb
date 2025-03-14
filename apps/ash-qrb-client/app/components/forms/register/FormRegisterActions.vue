<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="form-register-actions w-full flex justify-between items-center gap-2.5">
    <UButton
        color="secondary"
        to="/auth"
    >
      <UIcon
          name="i-lucide-undo"
          :size="20"
      />

      <span>{{ t('back') }}</span>
    </UButton>

    <UButton
        color="primary"
    >
      <span>{{ t('formActionSignUp') }}</span>

      <UIcon
          name="i-lucide-user-plus"
          :size="20"
      />
    </UButton>
  </div>
</template>

<style scoped>

</style>