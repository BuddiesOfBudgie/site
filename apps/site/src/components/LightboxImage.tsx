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
  height: number;
  image: StaticImageData | string;
  previewHeight?: number;
  previewWidth?: number;
  sx?: SxProps<Theme>;
  width: number;
};

export const LightboxImage = ({
  altImageText,
  height,
  image,
  previewHeight,
  previewWidth,
  sx,
  width,
}: LightboxImageProps) => {
  const theme = useTheme();
  const [showImageFull, setShowImageFull] = React.useState(false);

  const useHeight = previewHeight ?? height;
  const useWidth = previewWidth ?? width;

  const boxStyling = {
    ...sx,
    width,
    [theme.breakpoints.down(width)]: {
      maxHeight: "fit-content",
      maxWidth: "100%",
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
  };

  return (
    <>
      <Box key={`lightbox-box-${altImageText}`} sx={boxStyling}>
        <Image
          alt={altImageText}
          height={useHeight}
          onClick={() => setShowImageFull(true)}
          src={image}
          style={{
            //height: "auto",
            maxWidth: "100%",
            objectFit: "cover",
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
