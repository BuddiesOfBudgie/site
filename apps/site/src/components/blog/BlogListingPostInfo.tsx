/**
 * This is our post info component for blog posts to display on blog listings. This post info comes in two sizes, "compressed" and "expanded".
 */

import type { PostOrPage } from "@tryghost/content-api";

// Material UI Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { GetPostTitle } from "../../common/ghost";
import { AuthorshipInfo } from "./AuthorshipInfo";
import { TagStrip } from "./TagStrip";
import { SiteTheme } from "@buddiesofbudgie/ui";
import { useMediaQuery, useTheme } from "@mui/material";
import NextLink from "../Link";

type BlogListingPostInfoParams = {
  condensed?: boolean;
  post: PostOrPage;
};

const BlogListingPostInfo = ({ condensed = false, post }: BlogListingPostInfoParams) => {
  const theme = useTheme();
  const stackDirection = condensed ? "row" : "column";

  const largeBreakpointAndCondensed = useMediaQuery(theme.breakpoints.up("lg")) && condensed;

  const showOnSmallView = largeBreakpointAndCondensed ? "none" : "inline-flex";
  const imageSize = largeBreakpointAndCondensed ? "40%" : "auto";

  const postTitle = GetPostTitle(post);

  return (
    <Stack
      className="BlogListingPostInfo"
      direction={{
        xs: "column",
        sm: "column",
        md: "column",
        lg: stackDirection,
        xl: stackDirection,
      }}
      height="max-content"
      key={`BlogListingPostInfo-${post.slug}`}
      spacing={2}
    >
      {post.feature_image && (
        <NextLink
          href={`/blog/${encodeURIComponent(post.slug)}`}
          prefetch={false}
          style={{
            minWidth: imageSize,
          }}
        >
          <Box
            sx={{
              aspectRatio: "16/9",
              backgroundImage: `url(${post.feature_image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
              borderRadius: "25px",
              cursor: "pointer",
              objectFit: "contain",
            }}
          />
        </NextLink>
      )}
      <Stack direction="column" spacing={2}>
        {post.tags && <TagStrip tags={post.tags} />}
        <NextLink
          href={`/blog/${encodeURIComponent(post.slug)}`}
          prefetch={false}
          style={{
            color: SiteTheme.palette.primary.dark,
            display: "inline-flex",
            textDecoration: "none",
          }}
        >
          <Typography
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            variant={condensed ? "h5" : "h4"}
          >
            {postTitle}
          </Typography>
        </NextLink>
        <Stack display={showOnSmallView} spacing={2}>
          {post.excerpt && <Typography variant="h6">{post.excerpt}</Typography>}
          <AuthorshipInfo post={post} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BlogListingPostInfo;
