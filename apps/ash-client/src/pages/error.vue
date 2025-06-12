<route lang="yaml">

</route>

<script setup lang="ts">
import ImgDoro from '~/assets/images/doro.webp'
</script>

<template>
  <section class="section-error h-full">
    <div class="container h-full">
      <div class="h-full flex justify-center items-center">
        <div class="flex flex-col gap-5">
          <h1 class="text-center font-black text-4xl text-s-old-lace">
            OOps. Error
          </h1>
          <img
              :src="ImgDoro"
              :width="200"
              :height="200"
              loading="eager"
              alt="Doro Doro?"
          >

          <div class="flex flex-col gap-2">
            <div class="text-center tex-xs text-s-old-lace">Dont watch on me</div>
            <RouterLink to="/" class="flex justify-center">
              <UButton
                  color="primary"
                  class="w-full cursor-pointer"
              >
                <span class="text-center text-s-purple-taupe w-full">Go to main</span>
              </UButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>