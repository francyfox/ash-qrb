<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'
import UserId from '../user-id/UserId.vue'

defineProps<{
  id?: string
  name?: string
  position?: string
  company?: string
}>()

const emit = defineEmits<{
  onLogout: []
}>()

const { t } = useI18n()

const open = ref(false)

const items: Ref<DropdownMenuItem[][]> = computed(() => [
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
      icon: 'i-lucide-heart-crack',
    },
  ],
  [
    {
      label: t('userMenuLogout'),
      icon: 'i-lucide-log-out',
      onSelect: async () => {
        emit('onLogout')
      },
    },
    {
      label: t('userMenuDelete'),
      icon: 'i-lucide-eraser',
    },
  ],
])
</script>

<template>
  <div class="w-[244px] flex flex-col items-center gap-1.5 pl-10">
    <UserId :id="id" />

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
        size="xl"
    >
      <UButton icon="i-lucide-settings-2">
        {{ t('sharedSettings')}}
      </UButton>
    </UDropdownMenu>
  </div>
</template>

<style scoped>

</style>