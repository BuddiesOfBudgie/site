/**
 * This is our index page used for all blog listings, including tags (like Releases)
 */

import React from "react";
import { GetAllPostsPaginated, GetTag } from "../../common/ghost"
import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from "next/types"

// Material UI Components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

// Our Components
import { CustomMetaProps } from "../../components/CustomMeta";
import PageBase from "../../components/PageBase";
import BlogListing from "../../components/blog/BlogListing";

const BlogIndex : NextPage = ({ posts, tag } : InferGetServerSidePropsType<typeof getServerSideProps>) => {
	let	PageTitle = tag.name ?? tag.og_title ?? tag.meta_title ?? tag.toUpperCase();

	const meta : CustomMetaProps = {
		Title: PageTitle
	};

	return (
		<PageBase meta={meta} NavBgColor="misc.lightgrey" UseCustomNavBg={true}>
			<Box display="inline-flex"  sx={{ backgroundColor: "misc.lightgrey"}} width="100%">
				<Typography align="center" fontWeight="bold" variant="h1" width="100%">{PageTitle}</Typography>
			</Box>
			<Container maxWidth="fullhd" sx={{ marginBlockStart: "2vh" }}>
				<BlogListing posts={posts} />
			</Container>
		</PageBase>
	)
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { tag, page } = context.query;

	let tagDetermined = Array.isArray(tag) ? tag[0] : tag;
	tagDetermined = tagDetermined ?? "news";

	let pageAsString = Array.isArray(page) ? page[0] : page;
	pageAsString = pageAsString ?? "0";

	const pageNum = Number(pageAsString); // Convert to a Number

	if (isNaN(pageNum) || pageNum < 0) { // No page found or requested page is an invalid list
		return {
			notFound: true
		}
	}

	const tagOrErr = await GetTag(tagDetermined); // Attempt to get it from Ghost so we know it is actually valid

	if (tagOrErr instanceof Error) { // Failed to get the tag
		return {
			notFound: true
		}
	}

	const posts = await GetAllPostsPaginated(pageNum, 10, tagDetermined);

	return { props: { posts, tag: tagOrErr } } ;
}

export default BlogIndex;