import Image from "next/image";
import type { InferGetStaticPropsType } from "next/types";
import type { CustomMetaProps } from "../../components/CustomMeta";

// MaterialUI Bits
import { Alert, Container, Stack, Typography, css, styled } from "@mui/material";

// Our Components
import PageBase from "../../components/PageBase";
import { AuthorshipInfo } from "../../components/blog/AuthorshipInfo";
import { TagStrip } from "../../components/blog/TagStrip";
import type { ParsedUrlQuery } from "querystring";
import { getPostBySlug, getPosts } from "../../common/getPosts";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { LightboxImage } from "../../components/LightboxImage";
import { OCCallout } from "../../components/blog/OCCallout";
import { PopText } from "../../components/pop/PopText";
import { inter } from "../../fonts";
import { InterText } from "../../components/InterText";
import { SiteTheme } from "../../theme";
import { getFullDomainPath } from "../../common/client";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

type fubarProps = {
  className: PageProps;
};

const Post = ({ className: { post, slug, source } }: fubarProps) => {
  const pageMeta: CustomMetaProps = {
    title: post.title,
    ogMeta: {
      description: post.excerpt,
      image: getFullDomainPath(post.featuredImage),
      title: post.title,
      url: getFullDomainPath(`/blog/${slug}`),
    },
  };

  return (
    <PageBase meta={pageMeta}>
      <Stack>
        <Container maxWidth="lg">
          <Stack margin="1vh 0" spacing={2}>
            <PopText color={SiteTheme.palette.primary.main} fontWeight="bold" variant="h2">
              {post.title}
            </PopText>
            {post.excerpt && (
              <InterText color={SiteTheme.palette.misc.greyish} fontWeight={400} variant="h6">
                {post.excerpt}
              </InterText>
            )}
          </Stack>
        </Container>
        {typeof post.featuredImage === "string" && (
          <Container maxWidth="fullhd">
            <Image
              alt={post.title}
              className="featuredBlogImage"
              height={1080}
              priority={true}
              src={post.featuredImage}
              style={{
                height: "auto",
                maxWidth: "100%",
                objectFit: "scale-down",
              }}
              width={1920}
            />
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
        <BlogPostContent className={inter.className} maxWidth="lg">
          <MDXRemote
            {...source}
            components={{
              Alert,
              OCCallout,
              a: (props) => <a {...props} target="_blank"></a>,
              h1: (props) => <PopText variant="h3">{props.children}</PopText>,
              h2: (props) => <PopText variant="h4">{props.children}</PopText>,
              h3: (props) => <PopText variant="h5">{props.children}</PopText>,
              h4: (props) => (
                <InterText fontWeight="bold" variant="h6">
                  {props.children}
                </InterText>
              ),
              h5: (props) => (
                <Typography fontWeight="bold" variant="subtitle1">
                  {props.children}
                </Typography>
              ),
              p: (props) => <span {...props}></span>,
              img: ({ alt, src }) => {
                if (!src) return null;
                return (
                  <LightboxImage
                    altImageText={alt ?? ""}
                    image={src}
                    imageSx={{
                      height: "auto",
                      objectFit: "scale-down",
                      width: "auto",
                    }}
                    useOnlySx
                  />
                );
              },
            }}
          />
        </BlogPostContent>
      </Stack>
    </PageBase>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths = async () => {
  const posts = getPosts();
  const paths = posts.map((p) => ({
    params: { slug: p.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ locale, params }: { locale: string; params: IParams }) => {
  const { slug } = params;
  const post = getPostBySlug(slug);
  const messages = (await import(`../../messages/${locale}.json`)).default as IntlMessages;
  if (!post)
    return {
      notFound: true,
    };

  const source = await serialize(post.content);

  return {
    props: {
      messages,
      post,
      slug,
      source,
    },
  };
};

const BlogPostContent = styled(Container)(
  ({ theme }) => css`
    line-height: 2em;

    .kg-card {
      margin-block-end: 2vh;
    }

    .kg-callout-card-green {
      // Green card
      border-inline-start: 20px solid ${theme.palette.success.light};
    }

    .kg-callout-text {
      // Call to Action Cards
      padding: 1vw 1vw;
    }

    a:not(.MuiButton-root) {
      &,
      &:visited {
        display: inline-flex;
        width: max-content;
        // Visited or not
        color: ${theme.palette.success.main};
        text-decoration: none;
      }
    }

    figure {
      // Figure captions
      margin: 0; // Disable user agent margins
      overflow: hidden; // Prevents next images from going out of bounds
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin-block-start: 2vh;
    }

    blockquote {
      background: ${theme.palette.misc.lightgrey};
      margin-block: 0;
      margin-inline: 0;
      padding-inline: 1vw;

      & > span {
        margin: 0;
        padding-block: 0.5vh;
      }
    }

    span {
      display: block;
      margin-block: 1vh;
    }

    iframe {
      max-width: 100%;
      margin-block: 1vh;

      &[src^="https://www.youtube.com"]
      {
        // Is a YouTube embed
        aspect-ratio: 16 / 9;
        max-height: 480px;
        min-height: 360px;
        width: 720px;
      }
    }
  `
);

export default Post;
