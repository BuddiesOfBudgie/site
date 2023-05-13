/**
 * This file contains our component for displaying a flowing list of all tags for a post
 */

import type { Tag } from "@tryghost/content-api";

// Material UI Components
import Stack from "@mui/material/Stack";
import { Button } from "@buddiesofbudgie/ui";
import NextLink from "../Link";

type TagStripParams = {
  tags: Tag[];
};

export const TagStrip = ({ tags }: TagStripParams) => {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={1}>
      {tags.map((tag) => {
        const tagName =
          tag.name ??
          tag.meta_title ??
          tag.og_title ??
          `${tag.slug.toLocaleUpperCase(tag.slug.substring(0, 1))}${tag.slug.substring(1)}`;
        return (
          <NextLink key={`TagStrip-Item-${tagName}`} href={`/blog?tag=${encodeURIComponent(tag.slug)}`}>
            <Button color={"success"} size="medium" variant="outlined">
              {tagName}
            </Button>
          </NextLink>
        );
      })}
    </Stack>
  );
};
