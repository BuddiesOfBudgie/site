import { AppProps } from "next/app";
import { AbstractIntlMessages, NextIntlProvider } from "next-intl";

import "../styles/scss/main.scss";

type Props = AppProps & {
  pageProps: { messages: AbstractIntlMessages };
};

const App = ({ Component, pageProps }: Props) => {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Component {...pageProps} />
    </NextIntlProvider>
  );
};

export default App;
