<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits<{
  onSubmit: []
}>()
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
        type="button"
        @click="emit('onSubmit')"
        class="cursor-pointer"
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