// This file contains our custom Meta

import React from "react";
import Head from 'next/head'

export type CustomMetaProps = {
	Icon?: string; /// Defaults to our normal favicon
	Title: string;
};

export const CustomMeta : React.FC<CustomMetaProps> = (props : CustomMetaProps) => {
	return (
		<Head>
			<title>{props.Title}  | Buddies Of Budgie</title>
			<meta charSet="utf-8" />
			<link rel="icon" href={props.Icon ?? "/images/logo.svg"} />
			<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap" rel="stylesheet" />
		</Head>
	)
};