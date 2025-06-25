<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

const cursorRef = useTemplateRef<HTMLDivElement>('cursor')

const getPosition = (e: MouseEvent & TouchEvent) => {
  let x = 0
  let y = 0

  if (
    e.type === 'touchstart' ||
    e.type === 'touchmove' ||
    e.type === 'touchend' ||
    e.type === 'touchcancel'
  ) {
    const touch = e.touches[0] || e.changedTouches[0]
    x = touch.pageX - (cursorRef.value?.offsetWidth || 0) / 2
    y = touch.pageY - (cursorRef.value?.offsetHeight || 0) / 2
  } else if (
    e.type === 'mousedown' ||
    e.type === 'mouseup' ||
    e.type === 'mousemove' ||
    e.type === 'mouseover' ||
    e.type === 'mouseout' ||
    e.type === 'mouseenter' ||
    e.type === 'mouseleave'
  ) {
    x = e.clientX - (cursorRef.value?.offsetWidth || 0) / 2
    y = e.clientY - (cursorRef.value?.offsetHeight || 0) / 2
  }

  return { x, y }
}

function cursorMove(e: MouseEvent & TouchEvent) {
  const { x, y } = getPosition(e)

  // @ts-ignore
  const intractable = e.target.closest('a, button')
  const interaction = intractable !== null

  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interaction ? 0.8 : 1})`,
  }

  cursorRef.value?.animate(keyframes, {
    duration: 100,
    fill: 'forwards',
  })
}

onMounted(() => {
  setTimeout(() => {
    if (cursorRef.value) cursorRef.value.style.opacity = '1'
  }, 1000)

  window.onmousemove = (e) => {
    if (!cursorRef.value) return
    cursorMove(e as any)
  }

  window.ontouchmove = (e) => {
    if (!cursorRef.value) return
    cursorMove(e as any)
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