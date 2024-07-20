import Layout from '@root/components/layouts/Layout'
import { tolgee } from '@root/module/tolge/tolge.init'
import { TolgeeProvider, useTolgeeSSR } from '@tolgee/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import '@root/assets/postcss/globals.css'
import '@root/assets/font/fontello/css/fontello.css'
import '@fontsource-variable/exo-2'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()
  const ssrTolgee = useTolgeeSSR(tolgee, locale)
  const [reactQueryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          networkMode: 'offlineFirst', // keep caches as long as possible
          refetchOnWindowFocus: false, // don’t refetch on window focus
        },
      },
    }),
  )

  return (
    <>
      <Head>
        <title>HOME | ASH-QRB</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <QueryClientProvider client={reactQueryClient}>
        <TolgeeProvider tolgee={ssrTolgee}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TolgeeProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
