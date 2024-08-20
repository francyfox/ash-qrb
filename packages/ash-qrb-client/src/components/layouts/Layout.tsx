import QrbFooter from '@root/components/ui/qrb-footer/QrbFooter'
import QrbHeader from '@root/components/ui/qrb-header/QrbHeader'
import { motion } from 'framer-motion';
import { useEffect } from 'react'

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}, ref: IndexPageRef) {
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.body.classList.add('dark')
  })
  return (
    <div className="min-h-[100vh] flex flex-col bg-yellow-100 dark:bg-gray-800 overflow-x-hidden">
      <QrbHeader/>
      <div className="h-full">
        <motion.div
          initial={{x: 300, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          exit={{x: 300, opacity: 0}}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {children}
        </motion.div>
      </div>
  <QrbFooter/>
</div>
)
}
