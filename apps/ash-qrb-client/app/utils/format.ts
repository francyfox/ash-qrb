export const formatIntNumber = (v: number) =>
  new Intl.NumberFormat('en-US', {}).format(v)
