import { useEffect } from 'react'
import { useRouter } from 'next/router'
import languageDetector from '@root/module/i18n/i18n.language-detector'

export const useRedirect = (to?: string | undefined) => {
  const router = useRouter()
  to = to || router.asPath

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect()
    if (
      to.startsWith(`/${detectedLng}`) &&
      router.route === '/404'
    ) {
      // prevent endless loop
      router.replace(`/${detectedLng + router.route}`)
      return
    }

    // @ts-ignore
    languageDetector.cache(detectedLng)
    router.replace(`/${detectedLng + to}`)
  })

  return <></>
}

export const I18nRedirect = () => {
  useRedirect()
  return <></>
}

// eslint-disable-next-line react/display-name
export const getRedirect = (to?: string | undefined) => () => {
  useRedirect(to)
  return <></>
}