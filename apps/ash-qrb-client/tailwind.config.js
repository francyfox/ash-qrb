import { themeColorsTailwind } from './config'

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: '560px',
      md: '768px',
      lg: '1280px',
      xl: '1440px',
      '2xl': '1536px',
    },
    extend: {
      colors: themeColorsTailwind,
      fontFamily: {
        sofia: ['Sofia Sans Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
