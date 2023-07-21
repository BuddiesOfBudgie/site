/**
 * This is our listing component for blog posts to promote re-use across our main blog listing and tag-related listings
 */

// Material UI Components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Our Components
import BlogListingPostInfo from "./BlogListingPostInfo";
import { HalvedWidthOnHighResolution, StackDirectionColumnToRow } from "../../constants";
import type { BlogPost } from "../../types";

type BlogListingParams = {
  page: number;
  posts: BlogPost[];
};

const BlogListing: React.FC<BlogListingParams> = ({ page, posts }: BlogListingParams) => {
  const firstPage = page === 1;
  const moreThanFeatured = posts.length > 4;
  const hasExcessOrFirstPage = moreThanFeatured && firstPage;

  const firstPost = posts[0];
  const mastSelection = posts.slice(1, 4); // Get posts 1-4 to display for featured section
  const restOfSelection = hasExcessOrFirstPage ? posts.slice(4) : posts; // Get the 5th item and all items after

  const keyPrefix = "BlogListingPostInfo-toplevel";

  return (
    <Container maxWidth="subfullhd">
      <Stack alignItems="center" direction="column">
        {hasExcessOrFirstPage && (
          <>
            <Typography alignSelf="start" fontWeight="bold" marginBottom={6} textAlign="start" variant="h4">
              Featured Blogs
            </Typography>
            <Stack
              direction={StackDirectionColumnToRow}
              justifyContent="space-between"
              marginBottom={6}
              spacing={{ xs: 6, sm: 6, md: 6 }}
              width="100%"
            >
              <Box key={`Box-${keyPrefix}-${firstPost.id}`} width={HalvedWidthOnHighResolution}>
                <BlogListingPostInfo key={`${keyPrefix}-${firstPost.id}`} post={firstPost} />
              </Box>
              <Stack direction="column" spacing={6} width={HalvedWidthOnHighResolution}>
                {mastSelection.map((post) => (
                  <Box key={`Box-${keyPrefix}-${post.id}`}>
                    <BlogListingPostInfo condensed={true} key={`${keyPrefix}-${post.id}`} post={post} />
                  </Box>
                ))}
              </Stack>
            </Stack>
          </>
        )}
        {hasExcessOrFirstPage && (
          <Typography alignSelf="start" fontWeight="bold" marginBottom={6} textAlign="start" variant="h4">
            More Recent Posts
          </Typography>
        )}
        <Box display="inline-flex" justifyContent="space-between" flexWrap="wrap">
          {restOfSelection.map((post) => {
            return (
              <Box key={`Box-${keyPrefix}-${post.id}`} marginBottom={6} width={HalvedWidthOnHighResolution}>
                <BlogListingPostInfo condensed={false} key={`${keyPrefix}-${post.id}`} post={post} />
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Container>
  );
};

export default BlogListing;
