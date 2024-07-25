import SectionHomeHero from '@root/components/page/home/SectionHomeHero'
import SectionHomeTitle from '@root/components/page/home/SectionHomeTitle'
import { useTranslate } from '@tolgee/react'
export default function Page() {
  const { t } = useTranslate()
  return (
    <>
      <SectionHomeTitle title={t('page.home.h1')} />
      <SectionHomeHero />
    </>
  )
}
