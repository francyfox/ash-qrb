import SectionHomeTitle from '@root/components/sections/home/SectionHomeTitle';
import { useTranslate } from '@tolgee/react';
import QrbFormSignUp from '@root/components/qrb-form-sign-up/QrbFormSignUp';

export default function SignUp() {
  const { t } = useTranslate();
  return (
    <>
      <SectionHomeTitle title={t('page.signup.h1')} />
      <section className="page-signup">
        <div className="container">
          <div className="w-full max-w-lg flex py-5">
            <QrbFormSignUp />
          </div>
        </div>
      </section>
    </>
  );
}