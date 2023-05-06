import { AppProps } from "next/app";
import { AbstractIntlMessages, NextIntlProvider } from "next-intl";

import "../styles/scss/main.scss";

import { Inter } from "@next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type Props = AppProps & {
  pageProps: { messages: AbstractIntlMessages };
};

const App = ({ Component, pageProps }: Props) => {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Component className={inter.className} {...pageProps} />
    </NextIntlProvider>
  );
};

export default App;
