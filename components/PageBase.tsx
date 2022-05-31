import * as React from "react";

// Material UI Bits
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// Our Material Theme
import { SiteTheme } from "../styles/theme";

// Our Components
import { CustomMeta, CustomMetaProps } from "../components/CustomMeta";
import { Nav, NavProps } from "../components/Nav";

interface PageBaseProps extends NavProps {
  meta: CustomMetaProps;
  children: any;
}

const PageBase: React.FC<PageBaseProps> = (props: PageBaseProps) => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={SiteTheme}>
        <CssBaseline />
        <CustomMeta {...props.meta} />
        <Nav {...props} />
        {props.children}
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default PageBase;
