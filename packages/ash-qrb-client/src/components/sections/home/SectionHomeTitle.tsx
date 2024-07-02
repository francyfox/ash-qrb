import { useTranslate } from '@tolgee/react';

export default function SectionHomeTitle() {
  const { t } = useTranslate();

  return (
    <section className="section bg-teal-600 mt-[50px] py-5 text-white">
      <div className="container">
        <h1 className="text-6xl font-600">
          { t('page.home.h1') }
        </h1>
      </div>
    </section>
  );
}
