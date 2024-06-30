module.exports = async (phase, { defaultConfig }) => {
  const withCSS = await import('next-pcss');

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    experimental: {
      // esmExternals: 'loose',
    },
    i18n: {
      locales: ['en-US', 'ru-RU'],
      defaultLocale: 'en-US',
      localeDetection: false,
    },
    publicRuntimeConfig: {
      NEXT_PUBLIC_TOLGEE_API_KEY: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
      NEXT_PUBLIC_TOLGEE_API_URL: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
    },
  };

  return nextConfig;
};
