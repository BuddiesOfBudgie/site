/**
 * This file contains our lightboxed image
 */

import React from "react";
import Image, { ImageProps, StaticImageData } from "next/image";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

export type LightboxImageProps = {
	altImageText: string;
	height: string | number;
	image: StaticImageData | string;
	sx?: Object;
	width: string | number;
}

export const LightboxImage : React.FC<LightboxImageProps> = (props) => {
	const [showImageFull, setShowImageFull] = React.useState(false);

	return (
		<>
			<Box key={`lightbox-box-${props.altImageText}`} sx={props.sx}>
				<Image
					alt={props.altImageText}
					height={props.height}
					objectFit="contain"
					onClick={ () => setShowImageFull(true)}
					src={props.image}
					width={props.width}
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
					layout="fill"
					src={props.image}
				/>
			</Backdrop>
		</>
	)
};