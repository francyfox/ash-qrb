import { defineConfig, presetUno, transformerVariantGroup } from 'unocss';

export default defineConfig({
  shortcuts: {
    'button-primary': 'bg-lime-7 px-2 py-1 text-white hover:(bg-lime-5 text-dark scale-105) transition-all',
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
