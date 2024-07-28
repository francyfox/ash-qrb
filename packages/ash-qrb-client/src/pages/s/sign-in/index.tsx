import SectionHomeTitle from '@root/components/page/home/SectionHomeTitle'
import QrbFormSignIn from '@root/components/page/sign-in/QrbFormSignIn'
import { useTranslate } from '@tolgee/react'

export default function SignIn() {
  const { t } = useTranslate()

  return (
    <>
      <SectionHomeTitle title={t('page.signin.h1')} />
      <section className="section-sign-in py-10 bg-yellow-50 dark:bg-gray-700 text-dark dark:text-gray-300">
        <div className="container">
          <div className="w-full max-w-lg">
            <QrbFormSignIn />
          </div>
        </div>
      </section>
    </>
  )
}
