/**
 * This is our Hero Banner for the Home pages
 */

import React from "react";
import Image from "next/image";

// Material UI Goodies
import { styled, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Images
import Laptop from "../../public/images/laptop.png";

const HeroBannerStyle = () => ({
  backgroundBlendMode: "darken",
  background: `rgba(0, 0, 0, 0.5) url(/images/hero-forest.svg)`,
  backgroundSize: "cover",
  borderRadius: 15,
});

const LaptopImageStyle = styled(Image)({
  maxWidth: "50%",
});

export const HeroBanner: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack alignItems="center" justifyContent="center" paddingY="2vh" spacing={6} sx={HeroBannerStyle}>
      <Box sx={{ maxWidth: "50%" }}>
        <Image src={Laptop} alt="Laptop" />
      </Box>
      <Typography
        align="center"
        sx={{
          color: "primary.light",
          fontWeight: 500,
          textAlign: {},
        }}
        variant="h4"
      >
        Budgie is a luxurious home computing experience.
      </Typography>
    </Stack>
  );
};
