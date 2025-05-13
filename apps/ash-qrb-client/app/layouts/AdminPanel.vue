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
        <div class="flex w-full min-h-[80vh] gap-5">
          <PanelCard class="card-content overflow-hidden">
            <slot />
          </PanelCard>

          <PanelCard class="card-menu max-w-[335px] overflow-hidden">
            <AsideNavigation />
          </PanelCard>
        </div>
      </div>
    </section>

    <footer class="bg-s-black-olive py-1">
      <div class="container">
        <div class="text-s-old-lace">
          This project under <a href="https://raw.githubusercontent.com/francyfox/ash-qrb/refs/heads/prototype/LICENSE" target="_blank" class="text-p-fawn">MIT license</a>
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