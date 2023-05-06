import * as React from "react";

// Material UI Bits
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// Our Material Theme
import { SiteTheme } from "@buddiesofbudgie/ui";

// Our Components
import { CustomMeta, CustomMetaProps } from "../components/CustomMeta";
import { Nav, NavProps } from "../components/Nav";

interface PageBaseProps extends NavProps {
  children: JSX.Element | JSX.Element[];
  meta: CustomMetaProps;
}

const PageBase = ({ children, meta, ...rest }: PageBaseProps) => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={SiteTheme}>
        <CssBaseline />
        <CustomMeta {...meta} />
        <Nav {...rest} />
        {children}
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default PageBase;
