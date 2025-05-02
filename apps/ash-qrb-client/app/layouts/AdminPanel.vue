<script setup lang="ts">
import PanelCard from '~/components/ui/cards/PanelCard.vue'
</script>

<template>
  <section class="admin-layout h-full">
    <div class="container flex items-center h-full">
      <div class="flex w-full min-h-[80vh] gap-5">
        <PanelCard class="card-content overflow-hidden">
          <slot />
        </PanelCard>

        <PanelCard class="card-menu max-w-[335px] overflow-hidden">

        </PanelCard>
      </div>
    </div>
  </section>
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