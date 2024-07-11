import type { JSX } from 'react';
import { createPortal } from 'react-dom';
import Close from '@sicons/ionicons5/Close.svg';

export interface QrbModalProps {
  show: boolean;
  title: string;
  children?: JSX.Element;
  footer?: JSX.Element;
  onClose?: () => void;
}

export default function QrbModal({ show, title, children, footer, onClose }: QrbModalProps) {
  return (
    <>
      {show && createPortal(
        <div className="qrb-modal fixed flex justify-center items-center bg-black/20">
          <div className="qrb-modal-card w-full max-w-md relative flex flex-col p-3">
            <button
              type="button"
              className="close absolute top-0 right-0 p-2 bg-dark hover:bg-teal-700 rd-lb-md transition-colors"
              onClick={onClose}
            >
              <Close className="icon text-white" />
            </button>
            <div className="flex flex-col items-between gap-3">
              <div className="text-4xl">
                {title}
              </div>

              {children
              && (
                <div className="qrb-modal-card-body">
                  {children}
                </div>
              )}

              {footer
              && (
                <div className="qrb-modal-card-footer">
                  { footer }
                </div>
              )}
            </div>
          </div>
        </div>, document.body)}
    </>
  );
}
