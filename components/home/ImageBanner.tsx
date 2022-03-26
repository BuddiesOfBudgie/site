/**
 * This is our generic Image Banner
 */

import React from "react";

// Material UI Goodies
import { useMediaQuery, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Our components
import { LightboxImage } from "../LightboxImage";

type StackDirection = "column" | "row" | "row-reverse";

 type ImageBannerProps = {
	altImageText : string;
	body: string;
	direction: StackDirection;
	headline: string;
	image: StaticImageData;
}

export const ImageBanner : React.FC<ImageBannerProps> = (props) => {
	const theme = useTheme();
	let stackDirection : StackDirection = props.direction;
	let justifyContentAlignment : "center" | "flex-start" = "flex-start";

	if (useMediaQuery(theme.breakpoints.down('md'))) { // Smaller than lg
		stackDirection = "column", justifyContentAlignment = "center";
	}

	return (
		<Stack
			alignItems={justifyContentAlignment}
			direction={stackDirection}
			key={`imagebanner-${props.altImageText}`}
			marginY={4}
		>
			<LightboxImage
				altImageText={props.altImageText}
				height="600px"
				image={props.image}
			/>
			<Stack
				alignItems={justifyContentAlignment}
				spacing={2}
				paddingTop={2}
				paddingX={2}
				sx={{
					[theme.breakpoints.down("md")]: {
						textAlign: "center"
					},
					[theme.breakpoints.up("md")]: {
						marginInlineStart:"2vh"
					},
					[theme.breakpoints.between("md", "lg")]: {
						maxWidth: "calc(90% - 400px)"
					},
					[theme.breakpoints.up("lg")]: {
						maxWidth: "calc(80% - 400px)",
					}
				}}
			>
				<Typography color={theme.palette.success.main} variant="h5">{props.headline}</Typography>
				<Typography
					sx={{
						fontWeight: "normal",
						lineHeight: 1.5,
						whiteSpace: "pre-line"
					}}
					variant="h6"
				>
					{props.body}
				</Typography>
			</Stack>
		</Stack>
	);
 };