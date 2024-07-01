import Link from 'next/link';
import QrCodeOutline from '@ricons/ionicons5/QrCodeOutline';
import QrbBurgerButton from '@root/components/qrb-burger/QrbBurgerButton';
import QrbLanguage from '@root/components/qrb-language/QrbLanguage';

const QrbHeader = () => (
  <header className="sticky top-0">
    <div className="container">
      <div className="flex justify-between gap-3 py-2">
        <Link href="/" className="bg-teal-600 text-white p-3 rd-sm">
          <span className="text-xl font-bold">ASH-QRB</span>
          <QrCodeOutline width={85} height={85} />
        </Link>

        <QrbBurgerButton />

        <QrbLanguage />
      </div>
    </div>
  </header>
);

export default QrbHeader;
