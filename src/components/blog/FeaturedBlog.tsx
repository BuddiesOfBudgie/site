/**
 * This is our featured blog
 */

import React from 'react';

// Material UI Bits
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

import './FeaturedBlog.scss';
import NextLink from '../Link';
import type { BlogPost } from '../../types';
import { SiteTheme } from '../../theme';

export type FeaturedBlogProps = {
  post: BlogPost;
};

export const FeaturedBlog = ({ post: p }: FeaturedBlogProps) => {
  return (
    <Box
      sx={{
        background: `
			rgb(238,238,238)
			linear-gradient(180deg, rgba(238,238,238,1) 60px, rgba(255,255,255,1) 61px)
			`,
      }}
    >
      <Container maxWidth="subfullhd">
        <Paper elevation={9} square={true}>
          <Stack
            direction={{
              [SiteTheme.breakpoints.between('xs', 'lg')]: 'column',
              [SiteTheme.breakpoints.up('lg')]: 'row',
            }}
          >
            {typeof p.featuredImage === 'string' && (
              <Image alt={''} className="featuredBlogImage" src={p.featuredImage} />
            )}
            <Stack direction="column">
              <NextLink href={`/blog/ ${encodeURIComponent(p.id)}`}>
                <Typography variant="h2">{p.title}</Typography>
              </NextLink>
              <Typography variant="subtitle1">{p.excerpt}</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
