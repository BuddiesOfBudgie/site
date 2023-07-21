/**
 * This file contains our component for displaying a flowing list of all tags for a post
 */

// Material UI Components
import Stack from "@mui/material/Stack";
import NextLink from "../Link";
import { Button } from "@mui/material";

type TagStripParams = {
  tags: string[];
};

export const TagStrip = ({ tags }: TagStripParams) => {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={1}>
      {tags.map((tag) => {
        return (
          <NextLink key={`TagStrip-Item-${tag}`} href={`/blog?tag=${encodeURIComponent(tag)}`}>
            <Button color="success" size="medium" variant="outlined">
              {tag.replaceAll("-", " ")}
            </Button>
          </NextLink>
        );
      })}
    </Stack>
  );
};
