import stylistic from "@stylistic/eslint-plugin";
export default [
  {
    extends: 'next/core-web-vitals',
    plugins: {
      '@stylistic': stylistic
    },
  },
  stylistic.configs.customize({
    // the following options are the default values
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  })
]
