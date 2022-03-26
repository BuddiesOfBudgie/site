/**
 * This file contains our lightboxed image
 */

import React from "react";
import Image from "next/image";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

type LightboxImageProps = {
	altImageText: string;
	height?: string;
	image: StaticImageData;
	sx?: Object;
}

export const LightboxImage : React.FC<LightboxImageProps> = (props) => {
	const [showImageFull, setShowImageFull] = React.useState(false);
	return (
		<>
			<Box key={`lightbox-box-${props.altImageText}`} sx={props?.sx}>
				<Image
					alt={props.altImageText}
					objectFit="contain"
					onClick={() => setShowImageFull(true)}
					height={(props.height ?? "auto")}
					src={props.image}
				/>
			</Box>
			<Backdrop
				key={`lightbox-backdrop-${props.altImageText}`}
				onClick={() => setShowImageFull(false)}
				open={showImageFull}
				sx={{
					backgroundColor: "rgba(0,0,0,0.7)",
					height: "100%",
					position: "fixed",
					width: "100%",
					zIndex: 9999,
					"& img": {
						maxWidth: "100%",
						objectFit: "scale-down"
					}
				}}
			>
				<Image
					alt={props.altImageText}
					src={props.image}
				/>
			</Backdrop>
		</>
	)
};