/**
 * This file containers our text-oriented color banner
 */

import React from "react";
import { useTheme } from "@mui/material";

// Material UI Bits
import Stack from "@mui/material/Stack";
import NextLink from "./Link";
import { PopButton } from "./pop/PopButton";
import { PopText } from "./pop/PopText";
import { InterText } from "./InterText";

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
      <PopText color={theme.palette.primary.light} variant="h5">
        {header}
      </PopText>
      <InterText fontWeight="normal" lineHeight={1.6} padding="2vh 0" variant="h6" whiteSpace="pre-line">
        {body}
      </InterText>
      <NextLink
        href={buttonHref}
        sx={{
          marginBlockStart: "auto",
        }}
        target={!buttonHref.startsWith("/") ? "_target" : "_self"}
      >
        <PopButton
          color="info"
          sx={{
            color: buttonTextColor,
            maxWidth: "max-content",
          }}
        >
          {buttonText}
        </PopButton>
      </NextLink>
    </Stack>
  );
};
