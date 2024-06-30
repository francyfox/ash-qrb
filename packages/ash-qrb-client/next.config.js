// @ts-check
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
      localeDetection: false
    },
  };

  return nextConfig
}
