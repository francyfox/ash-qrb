'use client'

import styles from '@root/assets/postcss/helpers.module.css'
import Close from '@sicons/ionicons5/Close.svg'
import Link from 'next/link'
import { createPortal } from 'react-dom'

interface PropsQrbBurgerDraw {
  show: boolean
  onWrapClick: (e: any) => void
}

const nav = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
  // Add more links as needed...
]

export const isDrawOut = (e: Event) => {
  const target = e.target as HTMLElement | null
  return (
    target?.classList.contains('qrb-burger-draw') ||
    target?.classList.contains('close') ||
    !!target?.closest('.close')
  )
}
const QrbBurgerDraw = ({ show, onWrapClick }: PropsQrbBurgerDraw) => {
  return (
    <>
      {show &&
        createPortal(
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            onClick={onWrapClick}
            className={`
      ${styles['show-on-active']} ${show ? styles['active'] : ''} qrb-burger-draw fixed flex justify-center items-center top-0 left-0 w-full h-full bg-dark/50 z-10`}
          >
            <div
              className={`${show ? styles['effect-grow-up'] : ''} relative h-full w-full max-h-2xl max-w-sm flex flex-col bg-lime-50 dark:bg-gray-600 shadow-dark/20 shadow-[0_0_20px]`}
            >
              <button
                type="button"
                className="close absolute top-0 right-0 p-2 bg-dark hover:bg-teal-700 rd-lb-md transition-colors"
              >
                <Close className="icon text-white" />
              </button>

              <nav className="flex flex-col items-center mt-[80px] px-5 gap-3">
                {nav.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="dark:(text-white) w-full flex justify-center border-2 px-3 py-1 hover:border-b-teal-700 hover:text-teal-700  transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default QrbBurgerDraw
