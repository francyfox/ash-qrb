import { themeColorsTailwind } from './theme.js'

/** @typedef { import('tailwindcss/defaultConfig') } DefaultConfig */
/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */

// ONLY FOR WEBSTORM
/** @type { DefaultConfig & { theme: { extend: DefaultTheme } } } */
export default {
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
