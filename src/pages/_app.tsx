import type { AppProps } from 'next/app';
import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { inter } from '../fonts';

type Props = AppProps & {
  pageProps: { messages: AbstractIntlMessages; locale: string };
};

const App = ({ Component, pageProps }: Props) => {
  // Locale is already determined by getLocale() in getStaticProps/getServerSideProps
  // and passed via pageProps, so we can use it directly
  const locale = pageProps.locale || 'en';

  return (
    <NextIntlClientProvider locale={locale} messages={pageProps.messages} timeZone="UTC">
      <Component
        className={{
          ...inter,
          ...pageProps,
        }}
      />
    </NextIntlClientProvider>
  );
};

export default App;
