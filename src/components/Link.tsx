import Link from 'next/link';
import type { LinkProps } from 'next/link';

import { css, styled } from '@mui/material';

const NextLink = styled(Link)<LinkProps>(
  () => css`
    color: unset;
    text-decoration: none;
  `
);

export default NextLink;
