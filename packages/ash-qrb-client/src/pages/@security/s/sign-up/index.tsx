import SectionHomeTitle from '@root/components/page/home/SectionHomeTitle'
import QrbFormSignUp from '@root/components/page/sign-up/QrbFormSignUp'
import QrbRoleChoose from '@root/components/ui/qrb-role-choose/QrbRoleChoose'
import { useTranslation } from 'next-i18next';
import { useState } from 'react'

export default function SignUp() {
  const { t } = useTranslation()
  const [role, setRole] = useState<undefined | number>(undefined)

  function roleChangeHandler(i: number) {
    setRole(i)
  }
  return (
    <>
      <SectionHomeTitle title={t('page.sign-up.h1')} />
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
