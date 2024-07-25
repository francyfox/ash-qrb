import SectionHomeTitle from '@root/components/page/home/SectionHomeTitle'
import QrbFormSignIn from '@root/components/page/sign-in/QrbFormSignIn'
import { useTranslate } from '@tolgee/react'

export default function SignIn() {
  const { t } = useTranslate()

  return (
    <>
      <SectionHomeTitle title={t('page.sign-in.h1')} />
      <section className="section-sign-in">
        <div className="container">
          <QrbFormSignIn />
        </div>
      </section>
    </>
  )
}
