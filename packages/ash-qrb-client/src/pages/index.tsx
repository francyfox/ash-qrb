import SectionHomeTitle from '@root/components/sections/home/SectionHomeTitle';
import SectionHomeHero from '@root/components/sections/home/SectionHomeHero';
import { useTranslate } from '@tolgee/react';
export default function Page() {
  const { t } = useTranslate();
  return (
    <>
      <SectionHomeTitle title={t('page.home.h1')} />
      <SectionHomeHero />
    </>
  );
}
