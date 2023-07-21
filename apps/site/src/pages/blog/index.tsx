/**
 * This is our index page used for all blog listings, including tags (like Releases)
 */

import React, { useMemo } from "react";
import type { InferGetServerSidePropsType } from "next/types";

// Material UI Components
import Container from "@mui/material/Container";
import { Pagination, Stack, Typography } from "@mui/material";

// Our Components
import type { CustomMetaProps } from "../../components/CustomMeta";
import PageBase from "../../components/PageBase";
import BlogListing from "../../components/blog/BlogListing";
import type { ParsedUrlQuery } from "querystring";
import { grey } from "@mui/material/colors";
import { getPosts, getPostsByTags } from "../../common/getPosts";
import { A, F, G, N, S, pipe } from "@mobily/ts-belt";
import type { BlogTagInfo } from "../../types";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type fubarProps = {
  className: PageProps;
};

const BlogIndex = ({ className: { page, pagesLength, posts, tag } }: fubarProps) => {
  const location = useMemo(() => {
    try {
      const url = new URL(document.location as unknown as string);
      return url;
    } catch (_) {
      return null;
    }
  }, []);
  const searchParams = useMemo(() => (location ? location.searchParams : null), [location]);
  const PageTitle = pipe(
    tag,
    S.split("-"),
    A.map((s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`),
    A.join(" ")
  );

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
      <Container maxWidth="fullhd" sx={{ marginBlock: "2vh" }}>
        <Stack alignItems="center" rowGap={2}>
          <BlogListing page={page} posts={posts} />
          {pagesLength > 1 && (
            <Pagination
              count={pagesLength}
              page={page}
              onChange={(_, navPage) => {
                if (!location || !searchParams) return;
                if (page === navPage) return;
                if (navPage === 1) {
                  searchParams.delete("page");
                } else {
                  searchParams.set("page", navPage.toString());
                }
                document.location.search = searchParams.toString();
              }}
              size="large"
            />
          )}
        </Stack>
      </Container>
    </PageBase>
  );
};

export const getServerSideProps = async ({ locale, query }: { locale: string; query: ParsedUrlQuery }) => {
  const { tag: tagInQuery, page: pageInQuery } = query;

  type QueryP = typeof tagInQuery;
  const convArr = (v: QueryP, d: string) =>
    pipe(v, F.defaultTo<QueryP, NonNullable<QueryP>>(d), (a) => (G.isArray(a) ? a[0] : a));

  const tag = convArr(tagInQuery, "news");
  const page = pipe(convArr(pageInQuery, "1"), Number, N.clamp(1, Infinity));

  const posts = getPosts();
  const postsByTags = getPostsByTags(posts);
  const postsByTag: BlogTagInfo | undefined = postsByTags[tag];

  if (!postsByTag) {
    // Failed to get the tag
    return {
      notFound: true,
    };
  }

  const paginatedPosts = postsByTag.posts.slice((page - 1) * 10, page * 10);

  if (!paginatedPosts.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
      page,
      pagesLength: postsByTag.pages,
      posts: paginatedPosts,
      tag,
    },
  };
};

export default BlogIndex;
