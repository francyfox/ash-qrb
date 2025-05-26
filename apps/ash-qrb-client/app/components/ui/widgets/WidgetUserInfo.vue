<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { authClient } from '~/libs/auth-client'
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'

const props = defineProps<{
  id?: string
  name?: string
  position?: string
  company?: string
}>()

const { t } = useI18n()

const toast = useToast()

const userStore = useUserStore()

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
        try {
          await userStore.signOut()
        } finally {
          toast.add({
            title: 'Logout complete',
            color: 'success',
          })

          setTimeout(() => {
            navigateTo('/auth')
          }, 500)
        }
      },
    },
    {
      label: t('userMenuDelete'),
      icon: 'i-lucide-eraser',
    },
  ],
])

const { copy, isSupported } = useClipboard()

const copyToast = () => {
  if (!isSupported) {
    toast.add({
      title: 'Your browser does not support Clipboard API',
      color: 'error',
    })
  }

  if (props.id) {
    copy(props.id)

    toast.add({
      title: 'Copied to clipboard!',
      color: 'info',
    })
  } else {
    toast.add({
      title: 'No information for clipboard',
      color: 'error',
    })
  }
}
</script>

<template>
  <div class="w-[244px] flex flex-col items-center gap-1.5 pl-10">
    <UTooltip text="Click to copy your id">
      <UButton
          v-if="id"
          type="button"
          size="xs"
          @click="copyToast"
      >
        <Icon
            name="i-lucide-link"
            :width="16"
            :height="16"
        />

        User ID:

        <span class="overflow-ellipsis overflow-hidden whitespace-nowrap w-[80px]">
        {{ id }}
      </span>
      </UButton>
    </UTooltip>

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