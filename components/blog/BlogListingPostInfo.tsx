/**
 * This is our post info component for blog posts to display on blog listings. This post info comes in two sizes, "compressed" and "expanded".
 */

import { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import Link from "next/link";

// Material UI Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { GetPostTitle } from "../../common/ghost";
import { AuthorshipInfo } from "./AuthorshipInfo";
import { TagStrip } from "./TagStrip";

type BlogListingPostInfoParams = {
	condensed?: boolean;
	post: PostOrPage;
}

const BlogListingPostInfo : React.FC<BlogListingPostInfoParams> = (props) => {
	const { post } = props;
	const condensed = props.condensed ?? false; // Default to false for condensed if not set
	const stackDirection = (condensed ? "row" : "column");

	const ensureShowOnSmallView = {
		xs: "inline-flex",
		sm: "inline-flex",
		md: "inline-flex",
		lg: condensed ? "none" : "inline-flex",
		xl: condensed ? "none" : "inline-flex"
	};

	const consistentImageSizes = {
		xs: "auto",
		sm: "auto",
		md: "auto",
		lg: condensed ? "40%" : "auto",
		xl: condensed ? "40%" : "auto"
	}

	const postTitle = GetPostTitle(post);

	return (
		<Stack
			className="BlogListingPostInfo"
			direction={{
				xs: "column",
				sm: "column",
				md: "column",
				lg: stackDirection,
				xl: stackDirection
			}}
			height="max-content"
			key={`BlogListingPostInfo-${post.slug}`}
			spacing={2}
		>
			{ post.feature_image &&
				<Link
				href={`/blog/${encodeURIComponent(post.slug)}`}
				passHref={true}
				prefetch={false}
			>
				<Box sx={{
					aspectRatio: "16/9",
					backgroundImage: `url(${post.feature_image})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "100%",
					borderRadius: "25px",
					cursor: "pointer",
					objectFit: "contain",
					width: consistentImageSizes
				}}/>
			</Link>
			}
			<Stack direction="column" spacing={2}>
				{ post.tags && <TagStrip tags={post.tags} /> }
				<Link
					href={`/blog/${encodeURIComponent(post.slug)}`}
					passHref={true}
					prefetch={false}
				>
					<Typography
						sx={{
							cursor: "pointer",
							fontWeight: "bold"
						}}
						variant={condensed ? "h5" : "h4"}
					>
						{postTitle}
					</Typography>
				</Link>
				<Stack display={ensureShowOnSmallView} spacing={2}>
					{
						post.excerpt && <Typography variant="h6">{post.excerpt}</Typography>
					}
					<AuthorshipInfo post={post} />
				</Stack>
			</Stack>
		</Stack>
	)
}

export default BlogListingPostInfo;