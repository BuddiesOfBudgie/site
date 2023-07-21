// This file contains our generic filled Button component
import React from "react";

// Material UI Bits
import type { ButtonProps } from "@mui/material";
import { Button, useTheme } from "@mui/material";

type BWButtonProps = {
  inverse?: boolean;
} & ButtonProps;

export const BWButton = ({ inverse = false, sx, ...rest }: BWButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      {...rest}
      sx={{
        ...sx,
        color: inverse ? theme.palette.primary.main : theme.palette.common.white,
        backgroundColor: inverse ? theme.palette.common.white : theme.palette.primary.main,
      }}
    />
  );
};

export default Button;
