<script setup lang="ts">
import PanelCard from '~/components/ui/cards/PanelCard.vue'
import HeaderDrop from '~/components/ui/header-drop/HeaderDrop.vue'
import AsideNavigation from '~/components/ui/nav/aside/AsideNavigation.vue'
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <header class="sticky top-0 left-0 w-full z-50">
      <div class="container">
        <div class="flex">
          <HeaderDrop />
        </div>
      </div>
    </header>
    <section class="admin-layout h-full">
      <div class="container flex items-center h-full">
        <div class="flex w-full max-h-[80%] min-h-[80vh] gap-5">
          <PanelCard class="card-content overflow-y-auto">
            <slot />
          </PanelCard>

          <PanelCard class="card-menu max-w-[335px] overflow-y-auto">
            <AsideNavigation />
          </PanelCard>
        </div>
      </div>
    </section>

    <footer class="bg-s-black-olive py-1">
      <div class="container">
        <div class="flex flex-wrap justify-between gap-2">
          <div class="text-s-old-lace">
            This project under <a href="https://raw.githubusercontent.com/francyfox/ash-qrb/refs/heads/prototype/LICENSE" target="_blank" class="text-p-fawn">MIT license</a>
          </div>

          <div class="inline-flex text-s-old-lace gap-1.5">
            Made with <div class="flex items-center gap-1.5"><Icon name="i-lucide-heart" class="text-red-400 size-4"/></div> by Ashra Fusion Team
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="postcss" scoped>
.card-content {
  position: relative;

  &:after {
    top: 0;
    left: 0;
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: .2;
    background: url("@/assets/images/bg-content.jpg") center / cover no-repeat;
  }
}

.card-menu {
  position: relative;

  &:after {
    top: 0;
    left: 0;
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: .2;
    background-image: url("@/assets/images/bg-menu.jpg");
  }
}
</style>