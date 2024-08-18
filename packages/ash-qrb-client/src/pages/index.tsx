import SectionHomeHero from '@root/components/page/home/SectionHomeHero'
import SectionHomeTitle from '@root/components/page/home/SectionHomeTitle'
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();
  return (
    <>
      <SectionHomeTitle title={t('page.homeH1')} />
      <SectionHomeHero />
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