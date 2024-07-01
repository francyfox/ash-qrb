module.exports = async (phase, { defaultConfig }) => {
  const UnoCSS = await import('@unocss/webpack');
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    webpack: (config) => {
      config.plugins.push(
        UnoCSS.default(),
      );
      return config;
    },
    experimental: {
      // esmExternals: 'loose',
    },
    i18n: {
      locales: ['en', 'ru'],
      defaultLocale: 'en',
      localeDetection: false,
    },
    publicRuntimeConfig: {
      NEXT_PUBLIC_TOLGEE_API_KEY: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
      NEXT_PUBLIC_TOLGEE_API_URL: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
    },
  };

  return nextConfig;
};
