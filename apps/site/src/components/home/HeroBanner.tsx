/**
 * This is our Hero Banner for the Home pages
 */

import React from "react";
import Image from "next/image";

// Material UI Goodies
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Images
import Laptop from "../../public/images/laptop.png";
import { useTranslations } from "next-intl";
import { Button } from "@buddiesofbudgie/ui";
import { Uris } from "../../constants";

export const HeroBanner = () => {
  const t = useTranslations();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={6}
      sx={{
        //backgroundBlendMode: "darken",
        background: `rgba(0, 0, 0, 0.5) url(/images/geo-forest.jpg)`,
        //backgroundColor: theme.palette.success.main,
        backgroundSize: "cover",
        borderRadius: 12,
        marginBlockEnd: 24,
        paddingBlockStart: 4,
        paddingBlockEnd: 8,
        position: "relative",
      }}
    >
      <Image
        alt="Laptop"
        src={Laptop}
        style={{
          height: "auto",
          maxWidth: "80vw",
          objectFit: "scale-down",
          marginBlockEnd: 100,
        }}
      />
      <Stack
        alignItems="center"
        gap={4}
        sx={{
          backgroundColor: "primary.light",
          borderRadius: 6,
          padding: 6,
          position: "absolute",
          bottom: -100,
        }}
      >
        <Typography
          align="center"
          sx={{
            color: "primary.dark",
            fontWeight: 500,
            textAlign: {},
          }}
          variant="h5"
        >
          {t("Home.HeroBanner")}
        </Typography>
        <Button
          color="success"
          externalURL
          href={Uris.GET_BUDGIE}
          sx={{ fontWeight: 600, maxWidth: "max-content" }}
          text={t("Get Budgie")}
        />
      </Stack>
    </Stack>
  );
};
