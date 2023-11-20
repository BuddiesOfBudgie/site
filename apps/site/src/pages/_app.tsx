import type { AppProps } from "next/app";
import type { AbstractIntlMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { inter } from "../fonts";
import { useRouter } from "next/router";

type Props = AppProps & {
  pageProps: { messages: AbstractIntlMessages };
};

const App = ({ Component, pageProps }: Props) => {
  const router = useRouter();

  return (
    <NextIntlClientProvider locale={router.locale} messages={pageProps.messages} timeZone="UTC">
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
