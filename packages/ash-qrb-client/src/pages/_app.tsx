import Layout from '@root/components/layouts/Layout'
import type { AppProps } from 'next/app'
import '@root/assets/postcss/globals.css'
import '@root/assets/font/fontello/css/fontello.css'
import '@fontsource-variable/exo-2'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  const [reactQueryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          networkMode: 'offlineFirst',
          refetchOnWindowFocus: false,
        },
      },
    }),
  )


  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone={'Asia/Almaty'}
    >
      <QueryClientProvider client={reactQueryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </NextIntlClientProvider>
  )
}

export default MyApp
