export const trimPhoneNumber = (value: string) => value.replace(/[(/)+-/\s]/g, '')
export const formatPhoneNumber = (value: string) => {
  let output = value.substring(1, value.length)
  if (value.startsWith('7')) output = `+7 ${output}`
  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  return output.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `($1) $2 $3 $4`)
}