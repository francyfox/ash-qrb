import SectionHomeTitle from '@root/components/page/home/SectionHomeTitle'
import QrbFormSignUp from '@root/components/page/sign-up/QrbFormSignUp'
import QrbRoleChoose from '@root/components/ui/qrb-role-choose/QrbRoleChoose'
import { useState } from 'react'

export default function SignUp() {
  const [role, setRole] = useState<undefined | number>(undefined)

  function roleChangeHandler(i: number) {
    setRole(i)
  }

  return (
    <>
      <SectionHomeTitle title={'page.signup.h1'} />
      <section className="page-signup bg-yellow-50 dark:bg-gray-700 text-dark dark:text-gray-300">
        <div className="container">
          <div className="w-full pt-4">
            {!role && (
              <QrbRoleChoose role={role} changeRole={roleChangeHandler} />
            )}
          </div>
          <div className="w-full max-w-lg flex py-5">
            {role && (
              <QrbFormSignUp role={role} back={() => setRole(undefined)} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`@root/module/i18n/locales/${context.locale}.json`)).default
    }
  };
}