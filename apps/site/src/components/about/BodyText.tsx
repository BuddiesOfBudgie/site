import type { TypographyProps } from "@mui/material";
import React from "react";
import { InterText } from "../InterText";

export const BodyText = ({ children, ...rest }: TypographyProps) => (
  <InterText lineHeight={2} {...rest}>
    {children}
  </InterText>
);
