import env from 'env-var'

export const config = {
  NODE_ENV: env
    .get('NODE_ENV')
    .default('development')
    .asEnum(['production', 'test', 'development']),

  PORT: env.get('PORT').default(4000).asPortNumber(),
  API_URL: env.get('API_URL').required().asUrlString(),
  APP_VERSION: env.get('APP_VERSION').required().asString(),
  CLOUDINARY_CLOUD_NAME: env.get('CLOUDINARY_CLOUD_NAME').required().asString(),
}

export const themeColors: Record<string, string> = {
  pFawn: '#e69f71',
  pMiddleRed: '#E19477',
  sPurpleTaupe: '#49454A',
  sBlackOlive: '#413937',
  sMistyMoss: '#B3A872',
  sDarkVanilla: '#DACBB1',
  sChampagne: '#F1EACE',
  sOldLace: '#F8F6E4',
}

export const themeColorsTailwind = Object.keys(themeColors).reduce(
  (acc, currentValue) => {
    const key = currentValue.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    return Object.assign({}, acc, { [key]: themeColors[currentValue] })
  },
  {},
)
