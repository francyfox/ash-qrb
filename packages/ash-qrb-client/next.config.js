module.exports = async (phase, { defaultConfig }) => {
  const UnoCSS = await import('@unocss/webpack');
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    trailingSlash: true,
    poweredByHeader: false,
    reactStrictMode: true,
    i18n: {
      locales: ['en', 'ru'],
      defaultLocale: 'en',
    },
    webpack: (config) => {
      config.plugins.push(
        UnoCSS.default(),
      );
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      return config;
    },
    publicRuntimeConfig: {
      NEXT_API_URL: process.env.NEXT_API_URL,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
      ],
    },
  };

  return nextConfig;
};
