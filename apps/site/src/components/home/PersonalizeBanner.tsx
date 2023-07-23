/**
 * This is our banner for "making budgie your own" / personalize
 */

import React, { useState } from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";

import { Box, useTheme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import MacLike from "../../../public/images/personalize/macLike.jpg";
import Traditional from "../../../public/images/personalize/traditional.jpg";
import UnityLike from "../../../public/images/personalize/unityLike.jpg";
import { useTranslations } from "next-intl";

import SwipeableViews from "react-swipeable-views";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

interface ImageInfo {
  bgColor: string;
  image: StaticImageData;
  text: string;
  textColor: string;
}

export const PersonalizeBanner = () => {
  const t = useTranslations();

  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const images: ImageInfo[] = [
    {
      bgColor: theme.palette.success.main,
      image: MacLike,
      text: t("Home.Personalize.macOS"),
      textColor: theme.palette.primary.light,
    },
    {
      bgColor: theme.palette.misc.purple,
      image: Traditional,
      text: t("Home.Personalize.Traditional"),
      textColor: theme.palette.primary.light,
    },
    {
      bgColor: "#0099ff",
      image: UnityLike,
      text: t("Home.Personalize.Unity"),
      textColor: theme.palette.primary.light,
    },
  ];

  const maxSteps = images.length;

  const selectedImage = images[currentIndex];

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
  };

  const handleBack = () => {
    setCurrentIndex((i) => i - 1);
  };

  const handleStepChange = (step: number) => {
    setCurrentIndex(step);
  };

  const onFirst = !currentIndex;
  const onLast = currentIndex === maxSteps - 1;

  return (
    <Container
      key="personalizebanner"
      maxWidth={false}
      sx={{
        backgroundColor: theme.palette.primary.light,
        margin: "2vh 0",
        padding: "1vh 0",
      }}
    >
      <Backdrop
        onClick={() => setShowBackdrop(false)}
        open={showBackdrop}
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
        <Image alt={selectedImage.text} src={selectedImage.image} />
      </Backdrop>
      <Container maxWidth="md">
        <Stack alignItems="center" spacing={4}>
          <Typography align="center" fontWeight="bold" variant="h3">
            {t("Home.Personalize.Header")}
          </Typography>
          <Typography align="center" variant="h5">
            {t("Home.Personalize.Description")}
          </Typography>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={currentIndex}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((imageObj) => (
              <Box
                key={`personalize-banner-container-${imageObj.text}`}
                position="relative"
                sx={{
                  aspectRatio: 16 / 9,
                  height: 400,
                  width: "100%",
                }}
              >
                <Image
                  alt={imageObj.text}
                  fill
                  onClick={() => setShowBackdrop(true)}
                  sizes="(max-width: 900px) 95vw, 708px"
                  key={`personalize-banner-${imageObj.text}`}
                  src={imageObj.image}
                  style={{
                    objectFit: "scale-down",
                  }}
                />
              </Box>
            ))}
          </SwipeableViews>
          <Chip
            label={selectedImage.text}
            sx={{ backgroundColor: selectedImage.bgColor, color: selectedImage.textColor, width: "160px" }}
          />
          <Stack direction="row" spacing={4}>
            <IconButton size="small" onClick={!onFirst ? handleBack : () => setCurrentIndex(maxSteps - 1)}>
              {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton size="small" onClick={!onLast ? handleNext : () => setCurrentIndex(0)}>
              {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
};
