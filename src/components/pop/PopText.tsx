import React from 'react';
import { poppins } from '../../fonts';
import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';

export const PopText = ({ ...rest }: TypographyProps) => {
  return <Typography className={poppins.className} fontWeight="bold" {...rest} />;
};
