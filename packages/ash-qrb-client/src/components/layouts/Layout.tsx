import type { Metadata } from 'next';
import QrbHeader from '@root/components/qrb-header/QrbHeader';
import QrbFooter from '@root/components/qrb-footer/QrbFooter';
import '@root/assets/postcss/globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QrbHeader />
      {children}
      <QrbFooter />
    </>
  );
}
