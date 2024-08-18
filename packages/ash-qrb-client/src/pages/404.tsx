'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function Error404(error: any) {
  const t = useTranslations();
  return (
    <section className="py-5">
      <div className="container">
        <div className="flex flex-col gap-5">
          <div>
            <h1 style={{ fontSize: '3.75rem' }}>
              404
            </h1>
            <h2 className="text-xl">
              { t('page.404') }
            </h2>
          </div>
          <div className="flex">
            <Link href="/" className="button-primary">
              { t('error.home') }
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
