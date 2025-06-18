<script setup lang="ts">
import { APP_ENV__ } from '~/constants.ts'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
</script>

<template>
  <section class="section-home h-full">
    <div class="container flex justify-center items-center h-full">
      <main class="flex relative min-h-[500px] w-full justify-end max-w-lg text-s-old-lace bg-s-black-olive overflow-hidden rounded-none sm:rounded-xl p-5">
        <div class="flex max-w-sm flex-col text-right gap-2">
          <div class="flex relative flex-col gap-2 z-5">
            <div class="text-4xl">Ash-qrb</div>
            <div class="text-xl">
              pwa web app for creating qr codes gateway
              for another qr codes. <br>
              
              <RouterLink to="/dashboard" class="text-p-fawn hover:text-p-middle-red transition-color">Use dashboard</RouterLink>

              <br>
              <br>
              VERSION: {{ APP_ENV__.APP_VERSION }}
            </div>
          </div>

          <NuxtImg
              src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1740737420/ash-qrb/dllmfbqsqhk5ioxaus3v.png"
              :width="400"
              :height="400"
              alt="Ash-qrb logo"
              class="absolute w-[300px] md:w-auto bottom-[-30px] left-[-60px] z-0"
          >
            <template #loading>
              <USkeleton
                  class="w-[400px] h-[400px] bottom-[-30px] left-[-60px] z-0"
              />
            </template>
          </NuxtImg>
        </div>
      </main>
    </div>
  </section>
  <section>
    <div class="container">
      <ClientOnly>
        <QrbEditor />
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped>

</style>