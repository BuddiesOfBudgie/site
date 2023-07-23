/**
 * This is our index page used for all blog listings, including tags (like Releases)
 */

import React, { useMemo } from "react";
import type { InferGetServerSidePropsType } from "next/types";

// Material UI Components
import Container from "@mui/material/Container";
import { Button, Pagination, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

// Our Components
import type { CustomMetaProps } from "../../components/CustomMeta";
import PageBase from "../../components/PageBase";
import BlogListing from "../../components/blog/BlogListing";
import type { ParsedUrlQuery } from "querystring";
import { grey } from "@mui/material/colors";
import { getPosts, getPostsByTags } from "../../common/getPosts";
import { F, G, N, pipe } from "@mobily/ts-belt";
import type { BlogTagInfo } from "../../types";
import { getPrettyTagName } from "../../common/getPrettyTagName";
import { ORG } from "../../constants";
import Head from "next/head";
import { useTranslations } from "next-intl";
import { RssFeed } from "@mui/icons-material";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type fubarProps = {
  className: PageProps;
};

const BlogIndex = ({ className: { page, pagesLength, posts, tag } }: fubarProps) => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const t = useTranslations();

  const location = useMemo(() => {
    try {
      const url = new URL(document.location as unknown as string);
      return url;
    } catch (_) {
      return null;
    }
  }, []);
  const searchParams = useMemo(() => (location ? location.searchParams : null), [location]);
  const PageTitle = getPrettyTagName(tag);

  const meta: CustomMetaProps = {
    title: PageTitle,
  };

  return (
    <PageBase meta={meta} navBgColor="misc.lightgrey">
      <Head>
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`Atom feed for ${PageTitle} | ${ORG}`}
          href={`/feeds/${tag}.atom`}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`RSS feed for ${PageTitle} | ${ORG}`}
          href={`/feeds/${tag}.xml`}
        />
      </Head>
      <Container maxWidth="fullhd" sx={{ marginBlock: "2vh" }}>
        <Stack alignItems="center" rowGap={2}>
          <Container maxWidth="subfullhd">
            <Stack alignItems="center" direction="row" justifyContent="space-between" marginBottom={4} width={1}>
              <Typography
                sx={{
                  color: grey[800],
                  fontWeight: "bold",
                  textAlign: "start",
                }}
                variant="h2"
              >
                {PageTitle}
              </Typography>
              <Button
                color="success"
                href="/feeds"
                startIcon={!isOnMobile ? <RssFeed /> : undefined}
                variant="outlined"
              >
                {!isOnMobile && t("Feeds")}
                {isOnMobile && <RssFeed />}
              </Button>
            </Stack>
          </Container>
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
