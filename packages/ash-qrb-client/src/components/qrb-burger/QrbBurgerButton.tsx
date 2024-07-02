import { T } from '@tolgee/react';
import ListCircle from '@ricons/ionicons5/ListCircle';
import React from 'react';
const QrbBurgerButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex gap-2">
      <button type="button" onClick={onClick}>
        <span className="button-secondary flex items-center gap-2 text-2xl uppercase">
          <ListCircle className="icon" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          <T keyName="burger.button">Menu</T>
        </span>
      </button>
    </div>
  );
};

export default QrbBurgerButton;
