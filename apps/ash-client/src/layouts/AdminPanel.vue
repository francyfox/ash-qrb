<script setup lang="ts">
import { computed, onErrorCaptured, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionFooter from '~/components/sections/SectionFooter.vue'
import SectionHeader from '~/components/sections/SectionHeader.vue'

const { t } = useI18n()

const navData = computed(() => [
  {
    id: useId(),
    text: t('asideNavScanner'),
    attrs: {
      to: { path: '/qrb/scanner' },
    },
  },
  {
    id: useId(),
    text: t('asideNavProfile'),
    attrs: {
      to: { path: '/dashboard' },
    },
  },
  {
    id: useId(),
    text: t('asideNavList'),
    attrs: {
      to: { path: '/qrb-list' },
    },
  },
])

const error = ref({
  name: '',
  message: '',
})

onErrorCaptured((err) => {
  error.value = err
})
</script>

<template>
  <div class="admin-layout h-full flex flex-col justify-between">
    <SectionHeader />
    <section class="h-full">
      <div class="container flex items-center h-full">
        <div class="flex w-full min-h-[80vh] gap-5">
          <PanelCard class="card-content">
            <div class="card-content-container flex">
              <ClientOnly>
                <Suspense>
                  <router-view v-slot="{ Component, route }">
                    <transition name="slide" appear-from-class="hide-old">
                      <component :is="Component" :key="route" />
                    </transition>
                  </router-view>

                  <template #fallback>
                    <span v-if="error.name">
                      <span class="text-xl">Error! {{ error.name }}</span><br>
                      <i class="text-md">{{ error.message }}</i>
                    </span>
                    <span v-else class="flex items-center gap-2 text-xl">
                      <UIcon
                          name="i-lucide-loader-pinwheel"
                          class="size-6 animate-spin"
                      />
                      Loading...
                    </span>
                  </template>
                </Suspense>
              </ClientOnly>
            </div>
          </PanelCard>

          <PanelCard class="card-menu max-w-[335px] overflow-y-auto">
            <AsideNavigation :data="navData" />
          </PanelCard>
        </div>
      </div>
    </section>
    <SectionFooter />
  </div>
</template>

<style lang="postcss">
.hide-old {
  top: 0;
  left: 0;
  position: absolute;
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(0, 100%);
  height: auto;
}
.slide-leave-to {
  position: absolute;
  transform: translate(0, -100%);
  opacity: 0;
  height: 0;
}
</style>
<style lang="postcss" scoped>
.admin-layout {
  background: url("~/assets/images/bg.jpg") center center / cover no-repeat;
}
.card-content {
  @apply relative overflow-hidden;
  background: url("~/assets/images/bg-content.webp") center / cover no-repeat, var(--color-s-champagne);
}

.card-menu {
  position: relative;
  background-image: url("~/assets/images/bg-menu.webp");
}
</style>