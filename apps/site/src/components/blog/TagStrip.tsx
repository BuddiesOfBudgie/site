/**
 * This file contains our component for displaying a flowing list of all tags for a post
 */

// Material UI Components
import Stack from "@mui/material/Stack";
import NextLink from "../Link";
import { PopButton } from "../pop/PopButton";

type TagStripParams = {
  tags: string[];
};

export const TagStrip = ({ tags }: TagStripParams) => {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={1}>
      {tags.map((tag) => {
        return (
          <NextLink key={`TagStrip-Item-${tag}`} href={`/blog?tag=${encodeURIComponent(tag)}`}>
            <PopButton color="success" size="medium" variant="outlined">
              {tag.replaceAll("-", " ")}
            </PopButton>
          </NextLink>
        );
      })}
    </Stack>
  );
};
