import { useTolgee } from '@tolgee/react';

const QrbLanguage = () => {
  const tolgee = useTolgee(['language']);
  const btnClass = (current: 'en' | 'ru') => tolgee.getLanguage() === current
    ? 'button-primary !bg-green-900 pointer-events-none'
    : 'button-primary';

  return (
    <div className="flex items-center">
      <button
        type="button"
        className={btnClass('en')}
        onClick={() => tolgee.changeLanguage('en')}
      >
        ENG
      </button>
      <button
        type="button"
        className={btnClass('ru')}
        onClick={() => tolgee.changeLanguage('ru')}
      >
        РУС
      </button>
    </div>
  );
};

export default QrbLanguage;
