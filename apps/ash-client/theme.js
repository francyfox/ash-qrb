export const themeColors = {
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
