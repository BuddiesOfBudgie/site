/**
 * This is our featured blog
 */

import React from "react";
import { PostOrPage } from "@tryghost/content-api";

// Material UI Bits
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import "./FeaturedBlog.scss";
import { SiteTheme } from "@buddiesofbudgie/ui";

export type FeaturedBlogProps = {
  post: PostOrPage;
};

export const FeaturedBlog: React.FC<FeaturedBlogProps> = (props: FeaturedBlogProps) => {
  const p = props.post;

  return (
    <Box
      sx={{
        background: `
			rgb(238,238,238)
			linear-gradient(180deg, rgba(238,238,238,1) 60px, rgba(255,255,255,1) 61px)
			`,
      }}
    >
      <Container maxWidth="subfullhd">
        <Paper elevation={9} square={true}>
          <Stack
            direction={{
              [SiteTheme.breakpoints.between("xs", "lg")]: "column",
              [SiteTheme.breakpoints.up("lg")]: "row",
            }}
          >
            {typeof p.feature_image === "string" && (
              <Image alt={p.feature_image_alt || ""} className="featuredBlogImage" src={p.feature_image} />
            )}
            <Stack direction="column">
              <Link href={`/blog/ ${encodeURIComponent(p.slug)}`}>
                <Typography variant="h2">{p.title ?? p.og_title ?? p.meta_title}</Typography>
              </Link>
              <Typography variant="subtitle1">{p.meta_description ?? p.plaintext?.substring(0, 280)}</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
