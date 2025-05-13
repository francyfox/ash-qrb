import { animate, utils } from 'animejs'

export const animateNumber = (v: number) => {
  const refNum = ref(0)
  const target = {
    number: 0,
    unit: '0%',
  }

  animate(target, {
    number: v,
    unit: '100%',
    modifier: utils.round(0),
    delay: 100,
    duration: 1000,
    onRender: () => {
      refNum.value = target.number
    },
  })

  return refNum
}
