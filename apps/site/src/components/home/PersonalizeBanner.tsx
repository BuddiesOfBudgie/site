/**
 * This is our banner for "making budgie your own" / personalize
 */

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

// Material UI Goodies
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Material Icons
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// Personalize Images
import MacLike from "../../../public/images/personalize/macLike.jpg";
import Traditional from "../../../public/images/personalize/traditional.jpg";
import UnityLike from "../../../public/images/personalize/unityLike.jpg";
import { useTranslations } from "next-intl";

interface ImageInfo {
  bgColor: string;
  image: StaticImageData;
  text: string;
  textColor: string;
}

const FlexCarousel = styled(Carousel)`
  & .carousel.carousel-slider {
    display: inline-flex;
  }

  & button {
    margin-inline: 1em;
  }
`;

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

  const selectedImage = images[currentIndex];

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
        <Stack
          alignItems="center"
          spacing={4}
          sx={{
            margin: "1vh 0",
          }}
        >
          <Typography align="center" fontWeight="bold" variant="h3">
            {t("Home.Personalize.Header")}
          </Typography>
          <Typography align="center" variant="h5">
            {t("Home.Personalize.Description")}
          </Typography>
          <FlexCarousel
            autoPlay
            emulateTouch
            infiniteLoop
            onClickItem={() => setShowBackdrop(true)}
            onChange={(index) => setCurrentIndex(index)}
            renderArrowPrev={(clickHandler) => (
              <IconButton onClick={clickHandler} sx={{ height: "max-content", marginBlock: "auto" }} variant="outlined">
                <ArrowBack />
              </IconButton>
            )}
            renderArrowNext={(clickHandler) => (
              <IconButton onClick={clickHandler} sx={{ height: "max-content", marginBlock: "auto" }} variant="outlined">
                <ArrowForward />
              </IconButton>
            )}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            swipeable
          >
            {images.map((imageObj) => (
              <Image
                alt={imageObj.text}
                key={`personalize-banner-${imageObj.text}`}
                src={imageObj.image}
                style={{ height: "auto", maxWidth: "100%" }}
              />
            ))}
          </FlexCarousel>
          <Chip
            label={selectedImage.text}
            sx={{ backgroundColor: selectedImage.bgColor, color: selectedImage.textColor, width: "160px" }}
          />
        </Stack>
      </Container>
    </Container>
  );
};
