// This file contains our generic filled Button component
import React from "react";

// Material UI Bits
import type { ButtonProps } from "@mui/material";
import { Button, useTheme } from "@mui/material";

export const BWButton = ({ sx, ...rest }: ButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      {...rest}
      sx={{
        ...sx,
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
      }}
    />
  );
};

export default Button;
