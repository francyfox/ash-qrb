import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'

export default function SectionHomeHero() {
  const { t } = useTranslation()
  const content = { __html: t('page.home.hero').replaceAll('\n', '<br>') }

  return (
    <main className="py-10 bg-yellow-50 dark:bg-gray-700 text-dark dark:text-gray-300">
      <div className="container">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex">
            <Image
              src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1719919240/ash-qrb/u2wbqysgfywwuwjavnu5.svg"
              alt="Easy for mobile"
              width={300}
              height={300}
              className="w-full"
            />
          </div>

          <div className="h-full flex flex-col gap-5" dir="rtl">
            <div className="flex items-center gap-2">
              <Image
                src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1719920885/ash-qrb/mttrgywldstzn4dqhq4x.gif"
                alt="random qr"
                width={100}
                height={100}
                className="ml-2"
              />

              <div className="flex flex-col gap-5">
                <p role="banner" className="content lh-normal inline">
                  {t('page.home.hero')}
                </p>

                <div className="flex gap-2">
                  <Link href="/@security/s/sign-in" className="button-primary">
                    {t('login')}
                  </Link>

                  <Link href="/@security/s/sign-up" className="button-primary">
                    {t('register')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
