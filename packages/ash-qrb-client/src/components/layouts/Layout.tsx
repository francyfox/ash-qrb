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
    <div className={`${exo.className} min-h-[100vh] flex flex-col bg-yellow-100`}>
      <QrbHeader />
      <div className="h-full">
        {children}
      </div>

      <QrbFooter />
    </div>
  );
}
