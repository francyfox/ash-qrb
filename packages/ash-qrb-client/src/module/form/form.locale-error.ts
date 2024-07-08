export const localeError = (t: any, type: string): string => {
  switch (type) {
    case '52':
      return t('form.error.required');
    case '53':
      return t('form.error.pattern');
    default:
      return t('form.error.pattern');
  }
};
