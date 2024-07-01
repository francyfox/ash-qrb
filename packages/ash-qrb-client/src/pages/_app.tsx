import Head from 'next/head';
import type { AppProps } from 'next/app';
import { TolgeeProvider, useTolgeeSSR } from '@tolgee/react';
import { tolgee } from '@root/module/tolge/tolge.init';
import { useRouter } from 'next/router';
import Layout from '@root/components/layouts/Layout';
import '@root/assets/postcss/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  const ssrTolgee = useTolgeeSSR(tolgee, locale);

  return (
    <>
      <Head>
        <title>HOME | ASH-QRB</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <TolgeeProvider tolgee={ssrTolgee}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TolgeeProvider>
    </>
  );
}

export default MyApp;
