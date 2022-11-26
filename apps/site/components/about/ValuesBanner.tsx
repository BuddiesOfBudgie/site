// This file contains our values banner component for the About page

import { StaticImageData } from "next/image";

// Material UI Bits
import { Typography, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";

// Our components
import { ImageBanner } from "../ImageBanner";

type ValuesBannerProps = {
  description: string;
  image: StaticImageData;
  value: string;
};

const ValuesBanner = ({ description, image, value }: ValuesBannerProps) => {
  const theme = useTheme();

  return (
    <ImageBanner
      altImageText={value}
      direction="row"
      height={600}
      image={image}
      justifyContent="space-between"
      width={900}
    >
      <Stack
        marginLeft={{
          lg: "4vw",
          subfullhd: "4vw",
        }}
        sx={{
          [theme.breakpoints.down("md")]: {
            marginBlockStart: "2vh",
          },
          [theme.breakpoints.between("md", "lg")]: {
            marginInlineStart: "4vw",
            maxWidth: "50vw",
          },
          maxWidth: {
            md: "100%",
            lg: "40vw",
            subfullhd: "40vw",
            fullhd: "calc(100% - 900px - 4vw)",
          },
        }}
      >
        <Typography fontWeight={800} variant="h2">
          {value}
        </Typography>
        <Typography
          sx={{
            fontWeight: "normal",
            lineHeight: 2,
            whiteSpace: "pre-line",
          }}
          variant="h5"
        >
          {description}
        </Typography>
      </Stack>
    </ImageBanner>
  );
};

export default ValuesBanner;
