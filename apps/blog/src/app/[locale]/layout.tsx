/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-page-custom-font */
import { getHTMLTextDir } from 'intlayer';
import { IntlayerClientProvider, type NextLayoutIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { Header } from '@/shared/layouts';
import { Providers } from '../providers';

export { generateStaticParams } from 'next-intlayer';

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/fonts-archive/Paperlogy/Paperlogy.css"
          type="text/css"
        />

        <link
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
          rel="stylesheet"
        />
      </head>

      <IntlayerServerProvider locale={locale}>
        <body className="h-dvh w-full">
          <Providers>
            <Header />
            {children}
          </Providers>
        </body>
      </IntlayerServerProvider>
    </html>
  );
};
export default LocaleLayout;
