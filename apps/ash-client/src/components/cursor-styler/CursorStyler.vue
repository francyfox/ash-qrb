<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

const cursorRef = useTemplateRef<HTMLDivElement>('cursor')

onMounted(() => {
  setTimeout(() => {
    if (cursorRef.value) cursorRef.value.style.opacity = '1'
  }, 1000)

  window.onmousemove = (e) => {
    if (!cursorRef.value) return
    const x = e.clientX - cursorRef.value.offsetWidth / 2
    const y = e.clientY - cursorRef.value.offsetHeight / 2
    // @ts-ignore
    const intractable = e.target.closest('a, button')
    const interaction = intractable !== null

    const keyframes = {
      transform: `translate(${x}px, ${y}px) scale(${interaction ? 0.8 : 1})`,
    }

    console.log(keyframes)

    cursorRef.value.animate(keyframes, {
      duration: 100,
      fill: 'forwards',
    })
  }
})
</script>

<template>
  <div
      ref="cursor"
      class="cursor-styler opacity-0 fixed rounded-full top-0 w-[120px] h-[120px] pointer-events-none border-solid border-2 z-999 transition-opacity duration-300"
  />
</template>

<style scoped lang="postcss">
.cursor-styler {
  mix-blend-mode: color-burn;
}
</style>