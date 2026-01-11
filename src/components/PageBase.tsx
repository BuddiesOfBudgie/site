import { StrictMode, JSX } from 'react';

// Material UI Bits
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Our Material Theme

// Our Components
import type { CustomMetaProps } from '../components/CustomMeta';
import { CustomMeta } from '../components/CustomMeta';
import type { NavProps } from '../components/Nav';
import { Nav } from '../components/Nav';
import { SiteTheme } from '../theme';

interface PageBaseProps extends NavProps {
  children: JSX.Element | JSX.Element[];
  meta: CustomMetaProps;
}

const PageBase = ({ children, meta, ...rest }: PageBaseProps) => {
  return (
    <StrictMode>
      <ThemeProvider theme={SiteTheme}>
        <CssBaseline />
        <CustomMeta {...meta} />
        <Nav {...rest} />
        {children}
      </ThemeProvider>
    </StrictMode>
  );
};

export default PageBase;
