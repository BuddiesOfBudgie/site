/**
 * This is our generic Image Banner
 */

import React from "react";

// Material UI Goodies
import { useMediaQuery, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import Stack from "@mui/material/Stack";

// Our components
import type { LightboxImageProps } from "./LightboxImage";
import { LightboxImage } from "./LightboxImage";

type StackDirection = "column" | "row" | "row-reverse";
type StackJustifyContent = "center" | "flex-start" | "flex-end" | "space-between" | "space-evenly";

type ImageBannerProps = {
  children?: JSX.Element[] | JSX.Element;
  direction?: StackDirection;
  justifyContent?: StackJustifyContent;
  lightboxCustomSx?: SxProps<Theme>;
  stackCustomSx?: SxProps<Theme>;
} & LightboxImageProps;

export const AutoCenteredOnSmall = (): "center" | "flex-start" => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("md")) ? "center" : "flex-start";
};

export const AutoColumnOnSmall = (dir: StackDirection = "row"): StackDirection => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("md")) ? "column" : dir;
};

export const ImageBanner = ({
  altImageText,
  children,
  direction,
  image,
  justifyContent,
  lightboxCustomSx = {},
  stackCustomSx = {},
  ...rest
}: ImageBannerProps) => {
  return (
    <Stack
      alignItems={AutoCenteredOnSmall}
      direction={AutoColumnOnSmall(direction)}
      justifyContent={justifyContent ?? "inherit"}
      key={`imagebanner-${altImageText}`}
      marginY={4}
      sx={stackCustomSx}
      width="100%"
    >
      <LightboxImage altImageText={altImageText} image={image} sx={lightboxCustomSx} {...rest} />
      {children}
    </Stack>
  );
};
