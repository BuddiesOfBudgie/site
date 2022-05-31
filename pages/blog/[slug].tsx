import { GetAllPosts, GetPostBySlug, GetPostTitle } from "../../common/ghost";
import { ParsedUrlQuery } from "querystring";
import { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import { GetStaticProps, GetStaticPaths } from "next/types";
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
import { SiteTheme } from "../../styles/theme";
import { TagStrip } from "../../components/blog/TagStrip";

export const Post = (post: PostOrPage) => {
  const postTitle = GetPostTitle(post);
  const pageMeta: CustomMetaProps = {
    Title: postTitle,
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
                objectFit="scale-down"
                src={post.feature_image}
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

interface BlogSlugParams extends ParsedUrlQuery {
  slug: string;
}

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
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as BlogSlugParams;
  const props = await GetPostBySlug(slug); // Get the post for this slug
  return { props };
};

export default Post;
