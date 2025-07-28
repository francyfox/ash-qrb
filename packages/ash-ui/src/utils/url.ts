export function isValidHttpUrl(v: string): boolean {
  let url

  try {
    url = new URL(v);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export function isExternalUrl(v: string, regex: string = ''): boolean {
  const url = new URL(v)

  return !url.hostname
    .match(new RegExp(`localhost|127.0.0.1${regex}`))
}
