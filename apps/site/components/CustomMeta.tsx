// This file contains our custom Meta

import React from "react";
import Head from "next/head";

export type CustomMetaProps = {
  Icon?: string; /// Defaults to our normal favicon
  Title: string;
};

export const CustomMeta: React.FC<CustomMetaProps> = (props: CustomMetaProps) => {
  const title = `${props.Title} | Buddies of Budgie`;
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="icon" href={props.Icon ?? "/images/logo.svg"} />
    </Head>
  );
};
