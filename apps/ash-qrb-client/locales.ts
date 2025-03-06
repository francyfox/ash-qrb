export default [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'ru',
    name: 'Русский',
  },
].map((i) => {
  return {
    ...i,
    file: `./${i.code}.json`
  }
})