/**
 * This file contains our lightboxed image
 */

import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

// Material UI Goodies
import type { SxProps, Theme } from "@mui/material";
import { useTheme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

export type LightboxImageProps = {
  altImageText: string;
  height?: number;
  image: StaticImageData | string;
  imageSx?: SxProps<Theme>;
  priority?: boolean;
  previewHeight?: number;
  previewWidth?: number;
  sx?: SxProps<Theme>;
  useOnlySx?: boolean;
  width?: number;
};

export const LightboxImage = ({
  altImageText,
  height = 1080,
  image,
  imageSx = {},
  priority,
  previewHeight,
  previewWidth,
  sx,
  useOnlySx = false,
  width = 1920,
}: LightboxImageProps) => {
  const theme = useTheme();
  const [showImageFull, setShowImageFull] = React.useState(false);

  const useHeight = previewHeight ?? height;
  const useWidth = previewWidth ?? width;

  const boxStyling = !useOnlySx
    ? {
        ...sx,
        [theme.breakpoints.down(width)]: {
          maxHeight: "fit-content",
          maxWidth: "100%",
        },
        [theme.breakpoints.up(width)]: {
          width,
        },
        [theme.breakpoints.between(useWidth, "fullhd")]: {
          height: useHeight,
          width: useWidth,
          maxHeight: useHeight,
        },
        [theme.breakpoints.up("fullhd")]: {
          height: useHeight,
          width: useWidth,
        },
      }
    : sx;

  return (
    <>
      <Box key={`lightbox-box-${altImageText}`} sx={boxStyling}>
        <Image
          alt={altImageText}
          height={useHeight}
          onClick={() => setShowImageFull(true)}
          placeholder={typeof image !== "string" ? "blur" : undefined}
          priority={priority}
          src={image}
          style={{
            height: "auto",
            maxWidth: "100%",
            objectFit: "cover",
            ...(imageSx as Object),
          }}
          width={useWidth}
        />
      </Box>
      <Backdrop
        key={`lightbox-backdrop-${altImageText}`}
        onClick={() => setShowImageFull(false)}
        open={showImageFull}
        sx={{
          backgroundColor: "rgba(0,0,0,0.7)",
          height: "100%",
          position: "fixed",
          width: "100%",
          zIndex: 9999,
          "& img": {
            maxWidth: "100%",
            objectFit: "scale-down",
          },
        }}
      >
        <Image alt={altImageText} height={height} src={image} width={width} />
      </Backdrop>
    </>
  );
};
