// This file contains our custom Meta

import React from "react";
import Head from "next/head";

export type CustomMetaProps = {
  icon?: string; /// Defaults to our normal favicon
  title: string;
};

export const CustomMeta = ({ icon, title }: CustomMetaProps) => {
  const useTitle = `${title} | Buddies of Budgie`;
  return (
    <Head>
      <title>{useTitle}</title>
      <meta charSet="utf-8" />
      <link rel="icon" href={icon ?? "/images/logo.svg"} />
    </Head>
  );
};
