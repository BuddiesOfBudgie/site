/**
 * This is our navigation header component
 */

import React from "react";
import Image from "next/image"

// Material UI Bits
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container"
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";

// Our assets
import Logo from "../public/images/logo.svg";

export type NavProps = {
	NavBgColor?: string;
	UseCustomNavBg?: boolean;
}

export const Nav : React.FC<NavProps> = (props : NavProps) => {
	return (
		<Box sx={{backgroundColor: props?.NavBgColor ?? "" }}>
			<Container maxWidth="fullhd">
				<Box sx={{ flexGrow : 1, paddingTop: "1vh", paddingBottom: "1vh" }}>
					<AppBar position="static" color="transparent" sx={{ boxShadow: "0"}}>
						<Toolbar sx={{ p: "0.25vh 0"}}>
							<Stack alignItems="center" direction="row" sx={{ flexGrow: 1 }}>
								<Link href="/" sx={{ alignItems: "center",display: "inline-flex", marginInlineEnd: "auto" }} underline="none">
									<Image src={Logo} alt="Budgie Logo" height={46} width={46}/>
									<Typography sx={{ marginInlineStart: "1em" }} variant="h6">Buddies of Budgie</Typography>
								</Link>
								<Link href="/about" sx={{ marginInlineEnd: "2em" }} underline="none" variant="subtitle1">About</Link>
								<Link href="/blog" sx={{ marginInlineEnd: "2em" }} underline="none" variant="subtitle1">Blog</Link>
								<Link href="/docs" sx={{ marginInlineEnd: "2em" }} underline="none" variant="subtitle1">Documentation</Link>
								<Button
									color="success"
									href="/get"
									size="large"
									sx={{
										color: "primary.light"
									}}
									variant="contained"
								>
									Get Budgie
								</Button>
							</Stack>
						</Toolbar>
					</AppBar>
				</Box>
			</Container>
		</Box>
	)
};