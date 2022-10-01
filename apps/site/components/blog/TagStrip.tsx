/**
 * This file contains our component for displaying a flowing list of all tags for a post
 */

import { Tag } from "@tryghost/content-api";

// Material UI Components
import Stack from "@mui/material/Stack";
import { Button } from "@buddiesofbudgie/ui";

type TagStripParams = {
  tags: Tag[];
};

export const TagStrip: React.FC<TagStripParams> = (props) => {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={1}>
      {props.tags.map((tag) => {
        const tagName =
          tag.name ??
          tag.meta_title ??
          tag.og_title ??
          `${tag.slug.toLocaleUpperCase(tag.slug.substring(0, 1))}${tag.slug.substring(1)}`;
        return (
          <Button
            color={"success"}
            href={`/blog?tag=${encodeURIComponent(tag.slug)}`}
            key={`TagStrip-Item-${tagName}`}
            size="medium"
            text={tagName}
            variant="outlined"
          />
        );
      })}
    </Stack>
  );
};
