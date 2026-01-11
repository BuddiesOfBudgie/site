/**
 * This file contains our component for displaying authorship information (author, date of publication) for a Post
 */

import { DateTime } from 'luxon';

import Image from 'next/image';

// Material UI
import Stack from '@mui/material/Stack';
import type { BlogPost } from '../../types';
import { F } from '@mobily/ts-belt';
import type { Person } from '../../data/people';
import { People } from '../../data/people';
import { InterText } from '../InterText';
import { SiteTheme } from '../../theme';

type AuthorshipInfoParams = {
  post: BlogPost;
};

export const AuthorshipInfo = ({ post: { author, publishDate } }: AuthorshipInfoParams) => {
  const parsedDate: string = publishDate
    ? DateTime.fromISO(publishDate, { locale: 'en' }).toLocaleString(DateTime.DATE_FULL)
    : '';

  const person = F.coerce<Person>(People[author]);
  const authorName = `${person.Names.First} ${person.Names.Last}`;

  return (
    <Stack direction="row" spacing={2}>
      {person.Picture && (
        <Image alt={authorName ?? ''} height={60} src={person.Picture} style={{ borderRadius: '50%' }} width={60} />
      )}
      <Stack alignSelf="center" direction="column">
        <InterText variant="h6">{authorName}</InterText>
        <InterText sx={{ color: SiteTheme.palette.misc.greyish }} variant="subtitle1">
          {parsedDate}
        </InterText>
      </Stack>
    </Stack>
  );
};
