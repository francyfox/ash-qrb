import Layout from '@root/components/layouts/Layout'
import type { AppProps } from 'next/app'
import NextApp from 'next/app';
import '@root/assets/postcss/globals.css'
import '@root/assets/font/fontello/css/fontello.css'
import '@fontsource-variable/exo-2'
import QrbLoader from '@root/components/ui/qrb-loader/QrbLoader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'jotai';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps, messages }: AppProps & { messages: AbstractIntlMessages | undefined } ) {
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

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])


  return loading ? (<QrbLoader />) : (
    <NextIntlClientProvider
      locale={router.locale}
      messages={messages}
      timeZone={'Asia/Almaty'}
      onError={(error) => console.log(error)}
    >
      <Provider>
        <QueryClientProvider client={reactQueryClient}>
          <Layout>
            <AnimatePresence
              initial={false}
              mode="wait"
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <Component {...pageProps} key={router.asPath}/>
            </AnimatePresence>
          </Layout>
        </QueryClientProvider>
      </Provider>
    </NextIntlClientProvider>
  )
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
MyApp.getInitialProps = async function getInitialProps(context: any) {
  return {
    ...(await NextApp.getInitialProps(context)),
    messages: (await import(`@root/module/i18n/locales/${context.router.locale}.json`)).default
  };
};




export default MyApp
