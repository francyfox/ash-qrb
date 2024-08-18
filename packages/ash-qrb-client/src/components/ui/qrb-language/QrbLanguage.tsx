import { useTranslation } from 'next-i18next'

const QrbLanguage = () => {
  const { i18n } = useTranslation()
  const btnClass = (current: 'en' | 'ru') =>
    true
      ? 'button-primary !bg-green-900/40 pointer-events-none opacity-50'
      : 'button-primary'

  return (
    <div className="flex items-center">
      <button
        type="button"
        className={btnClass('en')}
        onClick={() => i18n.changeLanguage('en')}
      >
        ENG
      </button>
      <button
        type="button"
        className={btnClass('ru')}
        onClick={() => i18n.changeLanguage('ru')}
      >
        РУС
      </button>
    </div>
  )
}

export default QrbLanguage
