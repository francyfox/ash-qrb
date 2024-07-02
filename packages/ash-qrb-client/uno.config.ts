import { defineConfig, presetUno, transformerVariantGroup } from 'unocss';

export default defineConfig({
  shortcuts: {
    'button-primary': 'px-2 py-1 text-dark hover:(bg-lime-5 text-dark scale-105) transition-all transition-duration-50 rd-sm overflow-hidden',
    'button-secondary': 'bg-yellow-600 px-2 py-1 text-white hover:(bg-yellow-500 text-dark scale-105) transition-all transition-duration-50 rd-sm overflow-hidden',
  },
  content: {
    filesystem: [
      '**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
    ],
  },
  presets: [
    presetUno(),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
      },
      maxWidth: {
        lg: '1420px',
      },
    },
  },
});
