module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-nested': {},
    '@unocss/postcss': {
      // Optional
      content: ['**/*.{html,js,ts,jsx,tsx}'],
    },
  },
}