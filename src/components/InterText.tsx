import React from 'react';
import { inter } from '../fonts';
import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';

export const InterText = ({ ...rest }: TypographyProps) => {
  return <Typography className={inter.className} {...rest} />;
};
