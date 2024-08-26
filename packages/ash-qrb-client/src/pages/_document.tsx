import { Head, Html, Main, NextScript } from 'next/document'

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'en' }]
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function Document(params: any) {
  const currentLocale = params.__NEXT_DATA__.query.locale
  
  return (
    <Html lang={currentLocale}>
      <Head />
      <body>
      <style>
        {'body {\n' +
          '        background - color: black;\n' +
          '      }'}
      </style>

      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}