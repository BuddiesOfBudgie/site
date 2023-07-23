import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { grey } from "@mui/material/colors";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    subfullhd: true;
    fullhd: true;
  }

  interface Palette {
    misc: MiscColors;
  }

  interface PaletteOptions {
    misc: MiscColors;
  }

  interface MiscColors {
    greyish: string;
    lightgrey: string;
    purple: string;
    white: string;
  }
}

const Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      subfullhd: 1800,
      fullhd: 1920,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        variant: "contained",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: "2em",
          fontFamily: "Poppins",
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              border: `2px solid ${theme.palette[ownerState.color].main}`,
              "&.MuiButton-root:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }),
          ...(ownerState.variant === "contained" &&
            ownerState.color === "info" && {
              color: "black",
              "&, &.MuiButton-root:hover": {
                backgroundColor: "white",
              },
            }),
        }),
      },
    },
  },
  palette: {
    primary: {
      light: grey[100],
      main: grey[900],
      dark: grey[900],
    },
    misc: {
      greyish: "#666666",
      lightgrey: grey[200],
      purple: "#9f7beb",
      white: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
    success: {
      light: "#d5ffda",
      main: "#6bca81",
    },
  },
});

export const SiteTheme = responsiveFontSizes(Theme, {
  breakpoints: Theme.breakpoints.keys,
  factor: 2,
});
