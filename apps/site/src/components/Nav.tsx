/**
 * This is our navigation header component
 */

import React, { useMemo, useState } from "react";
import Image from "next/image";

// Material UI Bits
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { Button, Drawer, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Our assets
import Logo from "../../public/images/logo.svg";
import { useTranslations } from "next-intl";
import { Uris } from "../constants";
import { BWButton } from "@buddiesofbudgie/ui";
import NextLink from "./Link";
import type { NavLink } from "../types";

export type NavProps = {
  navBgColor?: string;
};

export const Nav = ({ navBgColor }: NavProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const t = useTranslations();

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  const navItems = useMemo<NavLink[]>(
    () => [
      {
        subMenu: [
          {
            title: t("About.Organization"),
            url: "/about/organization",
          },
          {
            title: t("About.Roadmap"),
            url: "/about/roadmap",
          },
        ],
        title: t("About.Generic"),
      },
      {
        title: t("Blog"),
        url: "/blog",
      },
      {
        title: t("Documentation"),
        url: Uris.DOCUMENTATION,
      },
      {
        isButton: true,
        title: t("Get Budgie"),
        url: Uris.GET_BUDGIE,
      },
    ],
    [t]
  );

  return (
    <Box sx={{ backgroundColor: navBgColor ?? "" }}>
      <Container maxWidth="fullhd">
        <Box sx={{ flexGrow: 1, paddingTop: "1vh", paddingBottom: "1vh" }}>
          <AppBar position="static" color="transparent" sx={{ boxShadow: "0" }}>
            <Drawer
              ModalProps={{
                keepMounted: true,
              }}
              onClose={toggleDrawer}
              open={showDrawer}
              variant="temporary"
            >
              {
                <Stack rowGap={4} sx={{ paddingBlockStart: 2, paddingInlineStart: 2, paddingInlineEnd: 12 }}>
                  {navItems.map(({ title, url }) => (
                    <NextLink key={`DrawerNav-Links-${title}`} href={url ?? "#"}>
                      <Typography fontSize="1.2em" sx={{ textDecoration: "underline" }}>
                        {title}
                      </Typography>
                    </NextLink>
                  ))}
                </Stack>
              }
            </Drawer>
            <Toolbar disableGutters={true}>
              <Stack alignItems="center" columnGap={2} direction="row" sx={{ flexGrow: 1 }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleDrawer}
                  sx={(theme) => ({
                    [theme.breakpoints.down("md")]: {
                      display: "show",
                    },
                    [theme.breakpoints.up("md")]: {
                      display: "none",
                    },
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ marginInlineEnd: "auto" }}>
                  <NextLink href="/">
                    <Box sx={{ alignItems: "center", display: "inline-flex" }}>
                      <Image src={Logo} alt="Budgie Logo" height={46} width={46} />
                      <Typography fontFamily="Poppins" sx={{ marginInlineStart: "1em" }} variant="h6">
                        Buddies of Budgie
                      </Typography>
                    </Box>
                  </NextLink>
                </Box>
                <Stack
                  alignItems="center"
                  columnGap={6}
                  direction="row"
                  sx={(theme) => ({
                    [theme.breakpoints.down("md")]: {
                      display: "none",
                    },
                  })}
                >
                  {navItems.map(({ isButton = false, subMenu, title, url }) => {
                    if (isButton)
                      return (
                        <NextLink key={`PrimaryNav-Links-NextLink-${title}`} href={url ?? "#"} target="_blank">
                          <BWButton key={`PrimaryNav-Links-${title}`} size="large">
                            {title}
                          </BWButton>
                        </NextLink>
                      );

                    if (subMenu)
                      return (
                        <Box key={`PrimaryNav-AttachedMenuButton-${title}`}>
                          <Button
                            aria-controls={anchorEl ? `NavMenu-${title}` : undefined}
                            aria-expanded={anchorEl ? "true" : undefined}
                            aria-label={`NavMenuButton-${title}`}
                            aria-haspopup="true"
                            disableElevation
                            disableRipple
                            id={`NavMenuButton-${title}`}
                            key={`NavMenuButton-${title}`}
                            onClick={(e: { currentTarget: React.SetStateAction<HTMLElement | null> }) =>
                              setAnchorEl(e.currentTarget)
                            }
                            sx={{
                              fontSize: "1rem",
                              fontWeight: 400,
                              textTransform: "none",
                            }}
                            variant="text"
                          >
                            {title}
                          </Button>
                          <Menu
                            MenuListProps={{
                              "aria-labelledby": `NavMenuButton-${title}`,
                            }}
                            anchorEl={anchorEl}
                            id={`NavMenu-${title}`}
                            key={`NavMenu-${title}`}
                            open={!!anchorEl}
                            onClose={() => setAnchorEl(null)}
                          >
                            {subMenu.map((item) => (
                              <MenuItem component="a" href={item.url} key={`NavMenuItem-${title}-${item.title}`}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Menu>
                        </Box>
                      );

                    return (
                      <NextLink
                        key={`PrimaryNav-Links-${title}`}
                        href={url ?? "#"}
                        passHref
                        target={url?.startsWith("http") ? "_blank" : "_self"}
                      >
                        <Typography fontFamily="Poppins" sx={{ textTransform: "none" }} variant="subtitle1">
                          {title}
                        </Typography>
                      </NextLink>
                    );
                  })}
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </Box>
  );
};
