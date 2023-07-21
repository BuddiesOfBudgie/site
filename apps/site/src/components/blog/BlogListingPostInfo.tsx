/**
 * This is our post info component for blog posts to display on blog listings. This post info comes in two sizes, "compressed" and "expanded".
 */

// Material UI Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AuthorshipInfo } from "./AuthorshipInfo";
import { TagStrip } from "./TagStrip";
import { SiteTheme } from "@buddiesofbudgie/ui";
import { useMediaQuery, useTheme } from "@mui/material";
import NextLink from "../Link";
import type { BlogPost } from "../../types";

type BlogListingPostInfoParams = {
  condensed?: boolean;
  post: BlogPost;
};

const BlogListingPostInfo = ({ condensed = false, post }: BlogListingPostInfoParams) => {
  const theme = useTheme();
  const stackDirection = condensed ? "row" : "column";

  const largeBreakpointAndCondensed = useMediaQuery(theme.breakpoints.up("lg")) && condensed;

  const showOnSmallView = largeBreakpointAndCondensed ? "none" : "inline-flex";
  const imageSize = largeBreakpointAndCondensed ? "40%" : "auto";

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
      key={`BlogListingPostInfo-${post.id}`}
      spacing={2}
    >
      {post.featuredImage && (
        <NextLink
          href={`/blog/${encodeURIComponent(post.id)}`}
          prefetch={false}
          style={{
            minWidth: imageSize,
          }}
        >
          <Box
            sx={{
              aspectRatio: "16/9",
              backgroundImage: `url(${post.featuredImage})`,
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
          href={`/blog/${encodeURIComponent(post.id)}`}
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
            {post.title}
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
