import type { AppProps } from "next/app";
import type { AbstractIntlMessages } from "next-intl";
import { NextIntlProvider } from "next-intl";
import { inter } from "../fonts";

type Props = AppProps & {
  pageProps: { messages: AbstractIntlMessages };
};

const App = ({ Component, pageProps }: Props) => {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Component
        className={{
          ...inter,
          ...pageProps,
        }}
      />
    </NextIntlProvider>
  );
};

export default App;
