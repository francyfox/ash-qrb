import SectionHomeHero from '@root/components/page/home/SectionHomeHero'
import SectionHomeTitle from '@root/components/page/home/SectionHomeTitle'
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();
  return (
    <>
      <SectionHomeTitle title={'page.homeH1'} />
      <SectionHomeHero />
    </>
  )
}