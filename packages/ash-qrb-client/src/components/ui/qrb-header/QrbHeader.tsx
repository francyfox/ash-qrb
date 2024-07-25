import QrbBurgerButton from '@root/components/ui/qrb-burger/QrbBurgerButton'
import QrbBurgerDraw, {
  isDrawOut,
} from '@root/components/ui/qrb-burger/QrbBurgerDraw'
import QrbLanguage from '@root/components/ui/qrb-language/QrbLanguage'
import QrCodeOutline from '@sicons/ionicons5/QrCodeOutline.svg'
import Link from 'next/link'
import { useState } from 'react'

const QrbHeader = () => {
  const [isShowingDraw, setDraw] = useState(false)

  function onCloseDraw(e: Event) {
    if (isDrawOut(e)) setDraw(false)
  }

  return (
    <header className="sticky top-0 z-10">
      <div className="container">
        <div className="flex">
          <div className="flex justify-start gap-2 p-2 bg-lime-100/50 shadow-lime-200 shadow-[0_0_20px] backdrop-blur-sm">
            <Link
              href="/"
              className="flex items-center gap-2 bg-teal-600 text-white text-align-center p-2 rd-sm"
            >
              <QrCodeOutline width={60} height={60} />

              <span className="text-xl font-bold ">
                ASH
                <br />
                QRB
              </span>
            </Link>

            <div className="flex flex-col gap-2">
              <QrbLanguage />
              <QrbBurgerButton onClick={() => setDraw(true)} />
              <QrbBurgerDraw show={isShowingDraw} onWrapClick={onCloseDraw} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default QrbHeader
