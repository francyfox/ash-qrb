<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="slide">
      <Component :is="Component" :key="route" />
    </Transition>
  </RouterView>
</template>