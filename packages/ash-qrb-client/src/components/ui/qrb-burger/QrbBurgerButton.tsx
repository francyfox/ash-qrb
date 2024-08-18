import { useTranslation } from 'next-i18next';
import ListCircle from '@sicons/ionicons5/ListCircle.svg';
import React from 'react';
const QrbBurgerButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation()
  return (
    <div className="flex gap-2">
      <button type="button" onClick={onClick}>
        <span className="button-secondary flex items-center gap-2 text-2xl uppercase">
          <ListCircle className="icon" />
          { t('burger.button') }
        </span>
      </button>
    </div>
  );
};

export default QrbBurgerButton;
