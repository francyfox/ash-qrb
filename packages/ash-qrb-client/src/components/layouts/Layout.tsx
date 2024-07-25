import QrbFooter from '@root/components/ui/qrb-footer/QrbFooter'
import QrbHeader from '@root/components/ui/qrb-header/QrbHeader'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.body.classList.add('dark')
  })
  return (
    <div className="min-h-[100vh] flex flex-col bg-yellow-100 dark:bg-gray-800">
      <QrbHeader />
      <div className="h-full">{children}</div>

      <QrbFooter />
    </div>
  )
}
