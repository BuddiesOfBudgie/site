import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { grey } from "@mui/material/colors";

const PoppinsFontFamily = {
  fontFamily: "Poppins",
};

const InterFontFamily = {
  fontFamily: "Inter",
};

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
      },
      styleOverrides: {
        root: {
          borderRadius: "2em",
        },
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
      main: "#6BCA81",
    },
  },
  typography: {
    h1: PoppinsFontFamily,
    h2: PoppinsFontFamily,
    h3: PoppinsFontFamily,
    h4: PoppinsFontFamily,
    h5: InterFontFamily,
    h6: InterFontFamily,
  },
});

export const SiteTheme = responsiveFontSizes(Theme, {
  breakpoints: Theme.breakpoints.keys,
  factor: 2,
});
