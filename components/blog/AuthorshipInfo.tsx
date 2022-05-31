/**
 * This file contains our component for displaying authorship information (author, date of publication) for a Post
 */

import { DateTime } from "luxon";

import { Author, PostOrPage } from "@tryghost/content-api";
import Image from "next/image";

// Material UI
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { SiteTheme } from "../../styles/theme";

type AuthorshipInfoParams = {
  post: PostOrPage;
};

export const AuthorshipInfo: React.FC<AuthorshipInfoParams> = (props) => {
  const { post } = props;

  const parsedDate: string = post.published_at
    ? DateTime.fromISO(post.published_at, { locale: "en" }).toLocaleString(DateTime.DATE_FULL)
    : "";

  const author: Author = post.primary_author ?? (post.authors?.at(0) as Author);

  return (
    <Stack direction="row" spacing={2}>
      {author.profile_image && (
        <Image alt={author.name} height={60} src={author.profile_image} style={{ borderRadius: "50%" }} width={60} />
      )}
      <Stack alignSelf="center" direction="column">
        {author.name && <Typography variant="h6">{author.name}</Typography>}
        <Typography sx={{ color: SiteTheme.palette.misc.greyish }} variant="subtitle1">
          {parsedDate}
        </Typography>
      </Stack>
    </Stack>
  );
};
