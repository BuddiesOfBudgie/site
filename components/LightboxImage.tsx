/**
 * This file contains our lightboxed image
 */

import React from "react";
import Image, { StaticImageData } from "next/image";

// Material UI Goodies
import { SxProps, Theme, useTheme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

export type LightboxImageProps = {
  altImageText: string;
  height: string | number;
  image: StaticImageData | string;
  sx?: SxProps<Theme>;
  width: string | number;
};

export const LightboxImage: React.FC<LightboxImageProps> = (props) => {
  const theme = useTheme();
  const [showImageFull, setShowImageFull] = React.useState(false);
  const { altImageText, height, image, sx = {}, width } = props;
  const widthAsNum: number = typeof width === "string" ? Number(width.replaceAll("px", "")) : width;

  const boxStyling = {
    ...sx,
    width,
    [theme.breakpoints.down(widthAsNum)]: {
      maxHeight: "fit-content",
      maxWidth: "100%",
    },
    [theme.breakpoints.between(widthAsNum, "fullhd")]: {
      maxHeight: height,
    },
    [theme.breakpoints.up("fullhd")]: {
      height,
    },
  };

  return (
    <>
      <Box key={`lightbox-box-${altImageText}`} sx={boxStyling}>
        <Image
          alt={altImageText}
          height={height}
          objectFit="cover"
          onClick={() => setShowImageFull(true)}
          src={image}
          width={width}
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
        <Image alt={altImageText} layout="fill" src={image} />
      </Backdrop>
    </>
  );
};
