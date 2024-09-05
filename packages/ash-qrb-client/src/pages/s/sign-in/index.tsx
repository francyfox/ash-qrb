import SectionHomeTitle from '@root/components/page/home/SectionHomeTitle'
import QrbFormSignIn from '@root/components/page/sign-in/QrbFormSignIn'
import { useTranslations } from 'next-intl';

export const trimPhoneNumber = (value: string) => value.replace(/[(/)+-/\s]/g, '')

export default function SignIn() {
  const t = useTranslations()

  const s = trimPhoneNumber('+ 7 (776) 453-88-86')
  console.log(s.length, s)
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