<script setup lang="ts">
const toast = useToast()

const providers = {
  toast,
}
</script>

<template>
  <section class="section-scanner mt-5">
    <div class="container">
      <DefaultCard class="py-5">
        <Scanner
            v-bind="{ providers }"
        />
      </DefaultCard>
    </div>
  </section>
</template>

<style scoped>

</style>