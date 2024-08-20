import Layout from '@root/components/layouts/Layout'
import type { AppProps } from 'next/app'
import NextApp from 'next/app';
import '@root/assets/postcss/globals.css'
import '@root/assets/font/fontello/css/fontello.css'
import '@fontsource-variable/exo-2'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react'

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


  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={messages}
      timeZone={'Asia/Almaty'}
      onError={(error) => console.log(error)}
    >
      <QueryClientProvider client={reactQueryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
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
