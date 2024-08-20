import { useTranslations } from 'next-intl';

export default function SectionHomeTitle({ title }: { title: string }) {
  const t = useTranslations()

  return (
    <section className="section bg-teal-600 dark:bg-teal-900 mt-[50px] py-5 text-white">
      <div className="container">
        <h1 className="text-6xl font-600">
          { t(title) }
        </h1>
      </div>
    </section>
  );
}
