<script setup lang="ts">
import SectionFooter from '~/components/sections/SectionFooter.vue'
import SectionHeader from '~/components/sections/SectionHeader.vue'
import PanelCard from '~/components/ui/cards/PanelCard.vue'
import AsideNavigation from '~/components/ui/nav/aside/AsideNavigation.vue'
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <SectionHeader />
    <section class="admin-layout h-full">
      <div class="container flex items-center h-full">
        <div class="flex w-full max-h-[80%] min-h-[80vh] gap-5">
          <PanelCard class="card-content overflow-y-auto">
            <RouterView />
          </PanelCard>

          <PanelCard class="card-menu max-w-[335px] overflow-y-auto">
            <AsideNavigation />
          </PanelCard>
        </div>
      </div>
    </section>
    <SectionFooter />
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