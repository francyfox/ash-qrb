<script setup lang="ts">
import ImgDevil from '~/assets/images/devil.gif'
</script>

<template>
  <footer class="bg-s-black-olive py-1">
    <div class="container">
      <div class="flex flex-col sm:flex-row justify-center items-center lg:justify-between gap-2">
        <div class="text-s-old-lace">
          An Open Source Project with <a href="https://raw.githubusercontent.com/francyfox/ash-qrb/refs/heads/prototype/LICENSE" target="_blank" class="text-p-fawn">MIT license</a>
        </div>

        <div class="relative inline-flex items-center text-s-old-lace gap-1.5">
          <div class="static sm:absolute top-[-28px] right-0">
            <img :src="ImgDevil" width="32" height="32" alt="devil" />
          </div>
          Made with <div class="flex items-center gap-1.5"><UIcon name="i-lucide-heart" class="text-red-400 size-4"/></div> by <a href="https://github.com/francyfox" target="_blank" class="text-p-fawn">HellizArt</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>