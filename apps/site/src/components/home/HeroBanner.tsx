/**
 * This is our Hero Banner for the Home pages
 */

import React from "react";
import Image from "next/image";

// Material UI Goodies
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Images
import Laptop from "../../../public/images/laptop.png";
import { useTranslations } from "next-intl";
import { Button } from "@buddiesofbudgie/ui";
import { Uris } from "../../constants";
import { grey } from "@mui/material/colors";
import NextLink from "../Link";

export const HeroBanner = () => {
  const t = useTranslations();

  return (
    <Stack alignItems="center" justifyContent="center" my={6} spacing={6}>
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
          <Button color="success" sx={{ color: "white", fontWeight: 600, maxWidth: "max-content" }}>
            {t("Get Budgie")}
          </Button>
        </NextLink>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="center"
        py={8}
        sx={{
          backgroundBlendMode: "darken",
          background: `rgba(0, 0, 0, 0.5) url(/images/geo-forest.jpg)`,
          //backgroundColor: theme.palette.success.main,
          backgroundSize: "cover",
          borderRadius: 12,
          position: "relative",
        }}
        width={1}
      >
        <Image
          alt="Laptop"
          unoptimized
          src={Laptop}
          style={{
            height: "auto",
            maxWidth: "80vw",
            objectFit: "scale-down",
          }}
        />
      </Stack>
    </Stack>
  );
};
