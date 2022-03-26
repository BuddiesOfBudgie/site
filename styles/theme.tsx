import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: true;
		sm: true;
		md: true;
		lg: true;
		xl: true;
		subfullhd: true,
		fullhd: true,
	}

	interface Palette {
		misc: MiscColors
	}

	interface PaletteOptions {
		misc: MiscColors
	}

	interface MiscColors {
		lightgrey: string;
		purple: string;
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
		}
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true
			},
			styleOverrides: {
				root: {
					borderRadius: "2em",
				}
			}
		}
	},
	palette: {
		primary: {
			light: "#f5f5f5",
			main: "#333333",
			dark: "#000000",
		},
		misc: {
			lightgrey: "#eeeeee",
			purple: "#9f7beb",
		},
		success: {
			main: "#6BCA81"
		}
	}
});

export const SiteTheme = responsiveFontSizes(Theme, {
		breakpoints: Theme.breakpoints.keys,
		factor: 2
	});