import QrbHeader from '@root/components/qrb-header/QrbHeader';
import QrbFooter from '@root/components/qrb-footer/QrbFooter';
import { Exo_2 } from '@next/font/google';

const exo = Exo_2({ subsets: ['latin'], display: 'swap' });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={exo.className + ' h-[99%] flex flex-col justify-between bg-lime-50'}>
      <QrbHeader />
      <div className="h-full">
        {children}
      </div>

      <QrbFooter />
    </div>
  );
}
