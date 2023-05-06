import { GetAllPosts, GetPostBySlug, GetPostTitle } from "../../common/ghost";
import Image from "next/image";
import { GetStaticPaths, NextPage, GetStaticProps, InferGetStaticPropsType } from "next/types";
import { CustomMetaProps } from "../../components/CustomMeta";
import Parser from "../../common/parser";

// MaterialUI Bits
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

// Our Components
import PageBase from "../../components/PageBase";
import { AuthorshipInfo } from "../../components/blog/AuthorshipInfo";
import { TagStrip } from "../../components/blog/TagStrip";
import { SiteTheme } from "@buddiesofbudgie/ui";
import { isArray } from "lodash";

const Post: NextPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const postTitle = GetPostTitle(post);
  const pageMeta: CustomMetaProps = {
    title: postTitle,
  };

  return (
    <PageBase meta={pageMeta}>
      <Stack>
        <Container maxWidth="lg">
          <Stack margin="1vh 0" spacing={2}>
            <Typography color={SiteTheme.palette.primary.main} fontWeight="bold" variant="h3">
              {GetPostTitle(post)}
            </Typography>
            {post.excerpt && (
              <Typography color={SiteTheme.palette.misc.greyish} fontWeight="400" variant="h6">
                {post.excerpt}
              </Typography>
            )}
          </Stack>
        </Container>
        {typeof post.feature_image === "string" && (
          <Container maxWidth="fullhd">
            <Box sx={{ bgcolor: SiteTheme.palette.misc.lightgrey }}>
              <Image
                alt={postTitle}
                className="featuredBlogImage"
                height={1080}
                src={post.feature_image}
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  objectFit: "scale-down",
                }}
                width={1920}
              />
            </Box>
          </Container>
        )}
        <Container maxWidth="lg">
          <Stack
            alignItems={{
              sm: "center",
            }}
            direction={{
              xs: "column",
              sm: "row",
              md: "row",
            }}
            justifyContent="space-between"
            margin="1vh 0"
            spacing={{
              xs: 2,
            }}
          >
            <AuthorshipInfo post={post} />
            {post.tags && <TagStrip tags={post.tags} />}
          </Stack>
        </Container>
        {post.html && (
          <Container className="customMarkdownStying" maxWidth="lg">
            {Parser(post.html)}
          </Container>
        )}
      </Stack>
    </PageBase>
  );
};

// getStaticPaths will define all the paths to content that should be statically generated
export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await GetAllPosts(); // Get all the posts from
  const slugs = allPosts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths: slugs,
    fallback: false,
  };
};

// getStaticProps will fetch the data of the blog post provided by the slug and return its properties
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const { slug } = params;
  const post = await GetPostBySlug(isArray(slug) ? slug[0] : slug); // Get the post for this slug
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default as IntlMessages,
      post,
    },
  };
};

export default Post;
