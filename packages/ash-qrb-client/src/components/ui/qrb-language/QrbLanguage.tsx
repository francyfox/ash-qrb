import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';

const QrbLanguage = () => {
  const t = useTranslations()
  const {locale, locales, route} = useRouter();

  const btnClass = (current: 'en' | 'ru') =>
    locale === current
      ? 'button-primary !bg-green-900/40 pointer-events-none opacity-50'
      : 'button-primary'

  return (
    <div className="flex items-center">

      <Link
        href={route}
        className={btnClass('en')}
        locale={'en'}
      >
        ENG
      </Link>
      <Link
        href={route}
        className={btnClass('ru')}
        locale={'ru'}
      >
        РУС
      </Link>
    </div>
  )
}

export default QrbLanguage
