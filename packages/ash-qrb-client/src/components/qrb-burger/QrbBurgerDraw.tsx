import styles from '@root/assets/postcss/helpers.module.css';
interface PropsQrbBurgerDraw {
  show: boolean;
  onWrapClick: (e: Event) => void;
}

export const isDrawOut = (e: Event) =>
  e.target instanceof HTMLElement && e.target.classList.contains('qrb-burger-draw');
const QrbBurgerDraw = ({ show, onWrapClick }: PropsQrbBurgerDraw) => {
  return (
    <div
      onClick={onWrapClick}
      className={`${styles['show-on-active']} ${show ? styles['active'] : ''} qrb-burger-draw fixed top-0 left-0 w-full h-full bg-dark/50 z-10`}
    >
      <div className="flex flex-col bg-lime-50/50"></div>
    </div>
  );
};

export default QrbBurgerDraw;
