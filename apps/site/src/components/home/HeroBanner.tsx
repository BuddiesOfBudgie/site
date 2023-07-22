/**
 * This is our Hero Banner for the Home pages
 */

import React from "react";

// Material UI Goodies
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Images
import { useTranslations } from "next-intl";
import { Uris } from "../../constants";
import { grey } from "@mui/material/colors";
import NextLink from "../Link";
import { Box, Button, useTheme } from "@mui/material";
import { LightboxImage } from "../LightboxImage";

import BudgieImage from "../../../public/images/Budgie.jpg";

export const HeroBanner = () => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      my={6}
      spacing={6}
      sx={{
        borderRadius: 12,
      }}
    >
      <Stack alignItems="center" gap={4}>
        <Typography
          align="center"
          sx={{
            color: grey[800],
            fontWeight: "bold",
            maxWidth: "22ch",
            textAlign: {},
          }}
          variant="h2"
        >
          {t("Home.HeroBanner")}
        </Typography>
        <NextLink href={Uris.GET_BUDGIE}>
          <Button
            color="success"
            size="large"
            sx={{
              color: theme.palette.common.white,
              maxWidth: "max-content",
            }}
          >
            {t("Get Budgie")}
          </Button>
        </NextLink>
      </Stack>
      <Box bgcolor="primary.dark" borderRadius={4} p={2} width={1}>
        <Box borderRadius={2} width={1}>
          <LightboxImage
            altImageText="Budgie"
            key={`herobanner-budgie-image`}
            height={BudgieImage.height}
            priority
            image={BudgieImage}
            imageSx={{
              borderRadius: 6,
            }}
            width={BudgieImage.width}
          />
        </Box>
      </Box>
    </Stack>
  );
};
