/**
 * This is our index page used for all blog listings, including tags (like Releases)
 */

import React from "react";
import { GetAllPostsPaginated, GetTag } from "../../common/ghost";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next/types";

// Material UI Components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

// Our Components
import type { CustomMetaProps } from "../../components/CustomMeta";
import PageBase from "../../components/PageBase";
import BlogListing from "../../components/blog/BlogListing";
import type { ParsedUrlQuery } from "querystring";
import { grey } from "@mui/material/colors";

type fubarProps = {
  className: InferGetServerSidePropsType<typeof getServerSideProps>;
};

const BlogIndex = ({ className: { posts, tag } }: fubarProps) => {
  const PageTitle = tag.name ?? tag.og_title ?? tag.meta_title ?? "";

  const meta: CustomMetaProps = {
    title: PageTitle,
  };

  return (
    <PageBase meta={meta} navBgColor="misc.lightgrey">
      <Typography
        align="center"
        sx={{
          color: grey[800],
          fontWeight: "bold",
          marginBlockStart: "2vh",
          textAlign: {},
        }}
        variant="h2"
      >
        {PageTitle}
      </Typography>
      <Container maxWidth="fullhd" sx={{ marginBlockStart: "2vh" }}>
        <BlogListing posts={posts} />
      </Container>
    </PageBase>
  );
};

export const getServerSideProps = async ({ locale, query }: { locale: string; query: ParsedUrlQuery }) => {
  const { tag, page } = query;

  let tagDetermined = Array.isArray(tag) ? tag[0] : tag;
  tagDetermined = tagDetermined ?? "news";

  let pageAsString = Array.isArray(page) ? page[0] : page;
  pageAsString = pageAsString ?? "0";

  const pageNum = Number(pageAsString); // Convert to a Number

  if (isNaN(pageNum) || pageNum < 0) {
    // No page found or requested page is an invalid list
    return {
      messages: (await import(`../../messages/${locale}.json`)).default,
      notFound: true,
    };
  }

  const tagOrErr = await GetTag(tagDetermined); // Attempt to get it from Ghost so we know it is actually valid

  if (tagOrErr instanceof Error) {
    // Failed to get the tag
    return {
      messages: (await import(`../../messages/${locale}.json`)).default,
      notFound: true,
    };
  }

  console.log("tagOrErr", tagOrErr);

  const posts = await GetAllPostsPaginated(pageNum, 10, tagOrErr);

  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
      posts,
      tag: tagOrErr,
    },
  };
};

export default BlogIndex;
