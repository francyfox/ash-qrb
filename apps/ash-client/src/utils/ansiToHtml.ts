export const ansiToHtml = (v: string) => {
  const code = atob(v)

  const BG_BLACK_CODE = '\u001b[40m'
  const BG_WHITE_CODE = '\u001b[47m'
  const RESET_CODE = '\u001b[0m'

  return code
    .replaceAll(BG_WHITE_CODE, '  ')
    .replaceAll(BG_BLACK_CODE, '██')
    .replaceAll(RESET_CODE, '')
}
