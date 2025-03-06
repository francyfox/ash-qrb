<script setup lang="ts">
import DefaultCard from '~/components/cards/DefaultCard.vue'
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
  <section class="section-auth h-full">
    <div class="container h-full">
      <div class="w-full min-h-[65vh] flex justify-center items-center">
        <DefaultCard title="ash-qrb.org">
          <div class="flex flex-wrap gap-2.5">
            <LightCard>
              <span class="text-base text-s-black-olive font-sofia">
                {{ t('securityLoggedIn') }}
              </span>
            </LightCard>

            <LightCard>
              <button
                  v-for="i in providers"
                  :key="i.id"
                  :title="i.provider"
                  type="button"
                  class="flex"
              >
                <Icon
                    :name="i.icon"
                    class="w-[24px] h-[24px]"
                />
              </button>
            </LightCard>
          </div>

          <template #footer>
            test
          </template>
        </DefaultCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>