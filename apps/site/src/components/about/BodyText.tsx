import type { TypographyProps } from "@mui/material";
import { Typography } from "@mui/material";
import React from "react";

export const BodyText = ({ children, ...rest }: TypographyProps) => (
  <Typography fontFamily="Inter" lineHeight={2} {...rest}>
    {children}
  </Typography>
);
