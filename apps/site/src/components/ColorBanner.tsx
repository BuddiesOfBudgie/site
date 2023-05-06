/**
 * This file containers our text-oriented color banner
 */

import React from "react";
import { useTheme } from "@mui/material";

// Material UI Bits
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@buddiesofbudgie/ui";

// Our components

type ColorBannerProps = {
  backgroundColor: string;
  body: string;
  buttonHref: string;
  buttonText: string;
  buttonTextColor: string;
  header: string;
};

export const ColorBanner = ({
  backgroundColor,
  body,
  buttonHref,
  buttonText,
  buttonTextColor,
  header,
}: ColorBannerProps) => {
  const theme = useTheme();

  return (
    <Stack
      className="ColorBanner"
      direction="column"
      key={`colorbanner-${header.toLowerCase().replace(" ", "-")}`}
      padding={4}
      sx={{
        color: theme.palette.primary.light,
        background: backgroundColor,
        borderRadius: "2em",
      }}
    >
      <Typography color={theme.palette.primary.light} fontWeight="bold" variant="h5">
        {header}
      </Typography>
      <Typography
        sx={{
          fontWeight: "normal",
          lineHeight: 1.5,
          padding: "2vh 0",
          whiteSpace: "pre-line",
        }}
        variant="h6"
      >
        {body}
      </Typography>
      <Button
        href={buttonHref}
        sx={{
          color: buttonTextColor,
          backgroundColor: theme.palette.primary.light,
          marginBlockStart: "auto",
          maxWidth: "max-content",
        }}
        text={buttonText}
      />
    </Stack>
  );
};
