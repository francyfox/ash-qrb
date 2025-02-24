import { themeColorsTailwind } from './config'

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    content: ['index.html', './src/**/*.{js,vue,ts,jsx,tsx}'],
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
