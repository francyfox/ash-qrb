import Close from '@sicons/ionicons5/Close.svg'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickAway } from 'react-use'

export interface QrbModalProps {
  show: boolean
  title: string
  children?: React.ReactNode
  footer?: React.ReactNode
  onClose: () => void
}

export default function QrbModal({
  show,
  title,
  children,
  footer,
  onClose,
}: QrbModalProps) {
  const modalCardRef = useRef<HTMLDivElement>(null)

  useClickAway(modalCardRef, onClose)

  return (
    <>
      {show &&
        createPortal(
          <div className="qrb-modal fixed top-0 left-0 flex w-full h-[100%] justify-center items-center bg-black/50 backdrop-blur-lg z-100">
            <div
              ref={modalCardRef}
              className="qrb-modal-card w-full max-w-md  relative flex flex-col bg-yellow-100 dark:bg-gray-800 p-3"
            >
              <button
                type="button"
                className="close absolute top-0 right-0 p-2 bg-dark hover:bg-teal-700 rd-lb-md transition-colors"
                onClick={onClose}
              >
                <Close className="icon text-white" />
              </button>
              <div className="flex flex-col items-between text-dark dark:text-white gap-3">
                <div className="text-4xl">{title}</div>

                {children && (
                  <div className="qrb-modal-card-body">{children}</div>
                )}

                {footer && (
                  <div className="qrb-modal-card-footer">{footer}</div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
