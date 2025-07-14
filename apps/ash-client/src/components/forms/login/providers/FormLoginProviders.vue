<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'
import type {
  ISocialProvider,
  TLoginProvider,
} from '~/components/forms/login/login.types.ts'
import IconYandexId from '~icons/ash/yandex-id'
import IconGoogle from '~icons/ash/google'

const { t } = useI18n()
const router = useRouter()

const toast = useToast()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const providers = [
  {
    id: useId(),
    icon: IconGoogle,
    provider: 'google',
  },
  {
    id: useId(),
    icon: IconYandexId,
    provider: 'yandex-id',
  },
] satisfies ISocialProvider[]

async function handleSSORedirect(provider: TLoginProvider) {
  const { data, error } = await userStore.signInProvider(provider)

  if (error) {
    toast.add({
      title: t('formError'),
      description: error.message || 'Unknown error',
      color: 'error',
    })
  } else {
    if (user.value) await router.push('/dashboard')
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-2.5">
    <LightCard>
      <span class="text-xl text-s-black-olive font-sofia">
        {{ t('securityLoggedIn') }}
      </span>
    </LightCard>

    <LightCard>
      <button
          v-for="i in providers"
          :key="i.id"
          :title="i.provider"
          type="button"
          class="cursor-pointer flex hover:scale-75 transition-transform"
          @click="handleSSORedirect(i.provider)"
      >
        <component
            :is="i.icon"
            class="w-[24px] h-[24px]"
        />
      </button>
    </LightCard>
  </div>
</template>

<style scoped>

</style>