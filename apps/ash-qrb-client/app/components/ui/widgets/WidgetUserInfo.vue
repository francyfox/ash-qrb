<script setup lang="ts">
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'

const props = defineProps<{
  id?: string
  name?: string
  position?: string
  company?: string
}>()

const { t } = useI18n()

const open = ref(false)

const items = [
  [
    {
      label: t('userMenuEdit'),
      icon: 'i-lucide-user-cog',
    },
    {
      label: t('userMenuFaq'),
      icon: 'i-lucide-message-circle-question',
    },
    {
      label: t('userMenuSupport'),
      icon: 'i-lucide-message-heart-crack',
    },
  ],
  [
    {
      label: t('userMenuEdit'),
      icon: 'i-lucide-user-cog',
    },
  ],
] satisfies DropdownMenuItem[]
</script>

<template>
  <div class="w-[244px] flex flex-col items-center gap-1.5">
    <UButton
        v-if="id"
        type="button"
        size="xs"
    >
      <Icon
          name="i-lucide-link"
          :width="16"
          :height="16"
      />

      #

      {{ id }}
    </UButton>

    <USkeleton v-if="!name" class="h-9 w-[80%] rounded-md" />
    <div class="text-3xl">
      {{ name }}
    </div>

    <USkeleton v-if="!position" class="h-7 w-[50%] rounded-md" />
    <div class="text-lg">
      {{ position }}
    </div>

    <USkeleton v-if="!company" class="h-7 w-[50%] rounded-md" />
    <div class="text-lg">
      {{ company }}
    </div>

    <UDropdownMenu
        v-model:open="open"
        :items="items"
        :ui="{
          content: 'w-48'
        }"
    >
      <UButton icon="i-lucide-settings-2">
        {{ t('sharedSettings')}}
      </UButton>
    </UDropdownMenu>
  </div>
</template>

<style scoped>

</style>