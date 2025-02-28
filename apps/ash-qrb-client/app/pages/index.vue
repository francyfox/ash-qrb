<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <section class="section-home h-full">
    <div class="container flex justify-center items-center h-full">
      <main class="flex relative min-h-[500px] w-full justify-end max-w-lg text-s-old-lace bg-s-black-olive/70 overflow-hidden rounded-none sm:rounded-xl p-5">
        <div class="flex max-w-sm flex-col text-right gap-2">
          <div class="flex relative flex-col gap-2 z-5">
            <div class="text-4xl">Ash-qrb</div>
            <div class="text-xl">
              pwa web app for creating qr codes gateway
              for another qr codes. <br>
              <NuxtLink to="/" class="text-p-fawn hover:text-p-middle-red transition-color">Use dashboard</NuxtLink>

              <br>
              <br>
              VERSION: {{ config.public.APP_VERSION }}
            </div>
          </div>

          <NuxtImg
              provider="cloudinary"
              src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1740737420/ash-qrb/dllmfbqsqhk5ioxaus3v.png"
              :width="400"
              :height="400"
              alt="Ash-qrb logo"
              class="absolute w-[300px] md:w-auto bottom-[-30px] left-[-60px] z-0"
          />
        </div>
      </main>
    </div>
  </section>
</template>

<style scoped>

</style>