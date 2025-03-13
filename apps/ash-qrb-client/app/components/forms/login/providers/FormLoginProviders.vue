<script setup lang="ts">
import LightCard from '~/components/cards/LightCard.vue'
import { createId } from '~/utils/generate'

const { t } = useI18n()
const providers = [
  {
    id: createId(),
    icon: 'ash:google',
    provider: 'google'
  },
  {
    id: createId(),
    icon: 'ash:apple',
    provider: 'apple'
  },
]
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
          class="flex hover:scale-75 transition-transform"
      >
        <Icon
            :name="i.icon"
            class="w-[24px] h-[24px]"
        />
      </button>
    </LightCard>
  </div>
</template>

<style scoped>

</style>