import QrbHeader from '@root/components/qrb-header/QrbHeader';
import QrbFooter from '@root/components/qrb-footer/QrbFooter';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-[100vh] flex flex-col bg-yellow-100`}>
      <QrbHeader />
      <div className="h-full">
        {children}
      </div>

      <QrbFooter />
    </div>
  );
}
