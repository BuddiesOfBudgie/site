import type { NextPage } from "next"
import { CustomMetaProps } from "../components/CustomMeta";

// Material UI Bits
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

// Our components
import { ColorBanner } from "../components/ColorBanner";
import { HeroBanner } from "../components/home/HeroBanner";
import { AutoCenteredOnSmall, ImageBanner } from "../components/ImageBanner";
import { PersonalizeBanner } from "../components/home/PersonalizeBanner";
import PageBase from "../components/PageBase";

// Images
import BudgieMenuImage from "../public/images/budgie-menu.png";
import RavenImage from "../public/images/raven.jpg";
import { StaticImageData } from "next/image";

type HomepageImageBannerContent = {
	AltImageText: string;
	Headline: string;
	Image: StaticImageData;
	Subtext: string;
}

export const meta : CustomMetaProps = {
	Title: "Home"
}

const Home: NextPage = () => {
	const theme = useTheme();
	const colorBannersStackDirection = useMediaQuery(theme.breakpoints.up("md")) ? "row" : "column";
	const colorBannersComponentMaxWidth = useMediaQuery(theme.breakpoints.up("md")) ? "46%" : "100%";

	const imageBannerContent : HomepageImageBannerContent[] = [
		{
			AltImageText: "Budgie Menu Image",
			Headline: "Launch right into your favorite apps",
			Image: BudgieMenuImage,
			Subtext: "Budgie Menu shows you all your installed applications, neatly organized into categories to improve discoverability, and with lightning fast application searching! No more diving into sub-menus to find the app you need."
		},
		{
			AltImageText: "Raven",
			Headline: "Control at your fingertips.",
			Image: RavenImage,
			Subtext: `Raven is an all-in-one center for accessing your calendar, controlling sound output and input (including per-app volume control), media playback and more.

			Raven also enables you to access missed notifications, with the ability to clear away individual notifications, grouped notifications, and all notifications.
			`
		}
	];

	return (
		<PageBase meta={meta}>
			<Container maxWidth="fullhd">
				<HeroBanner />
				{
					imageBannerContent.map((data, idx) => {
						const { AltImageText, Headline, Image, Subtext } = data;

						return (
							<ImageBanner
								altImageText={AltImageText}
								direction={idx % 2 === 0 ? "row" : "row-reverse"}
								key={`imagebanner-${AltImageText}`}
								height={Image.height}
								image={Image}
								width={Image.width}
							>
							<Stack
								alignItems={AutoCenteredOnSmall}
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
								<Typography color={theme.palette.success.main} variant="h5">{Headline}</Typography>
								<Typography
									sx={{
										fontWeight: "normal",
										lineHeight: 1.5,
										whiteSpace: "pre-line"
									}}
									variant="h6"
								>
									{Subtext}
								</Typography>
							</Stack>
						</ImageBanner>
					)
				})
				}
			</Container>
			<PersonalizeBanner />
			<Container maxWidth="fullhd">
				<Stack
					direction={colorBannersStackDirection}
					justifyContent="space-between"
					sx={{
						"& .ColorBanner": {
							maxWidth: colorBannersComponentMaxWidth,
							marginBottom: "2vh"
						}
					}}
				>
					<ColorBanner
						backgroundColor="linear-gradient(to right, #9f7beb, #7b83eb)"
						body="Budgie is built by the community, with volunteers from around the world, all contributing to make Budgie a better experience for everyone! Whether it is design work, software engineering, or translations, it is this community that makes it happen."
						buttonHref="/about"
						buttonText="Learn More"
						buttonTextColor="#9E7BEB"
						header="Built By The Community"
					/>
					<ColorBanner
						backgroundColor="linear-gradient(to right, #1687C7, #4DB2EC)"
						body="Budgie is available on a wide variety of operating systems, from Arch Linux to Ubuntu, and everything in between. Try it out today on the flavor of Linux of your choosing."
						buttonHref="/get"
						buttonText="Get Budgie"
						buttonTextColor="#1687C7"
						header="Getting Budgie"
					/>
				</Stack>
			</Container>
		</PageBase>
		)
}

export default Home