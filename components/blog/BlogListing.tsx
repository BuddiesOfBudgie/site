/**
 * This is our listing component for blog posts to promote re-use across our main blog listing and tag-related listings
 */

import { PostsOrPages } from "@tryghost/content-api";

// Material UI Components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


// Our Components
import BlogListingPostInfo from "./BlogListingPostInfo";
import { StackDirectionColumnToRow } from "../../common/vars";

type BlogListingParams = {
	posts: PostsOrPages; // Take in an array of PostOrPage
};

const BlogListing : React.FC<BlogListingParams> = (props) => {
	const { posts } = props;

	const firstPost = posts[0];
	const mastSelection = posts.slice(1, 4); // Get posts 1-4 to display for featured section
	const restOfSelection = posts.slice(4); // Get the 5th item and all items after

	const keyPrefix = "BlogListingPostInfo-toplevel";

	const blogPostContainerWidth = {
		xs: "100%",
		sm: "100%",
		md: "100%",
		lg: "48%",
		xl: "48%"
	};

	return (
	<Container maxWidth="subfullhd">
		<Stack alignItems="center" direction="column">
			<Typography alignSelf="start" fontWeight="bold" marginBottom={6} textAlign="start" variant="h4">Featured Blogs</Typography>
			<Stack
				direction={StackDirectionColumnToRow}
				justifyContent="space-between"
				marginBottom={6} 
				spacing={{ xs: 6, sm: 6, md: 6 }}
				width="100%"
			>
				<Box key={`Box-${keyPrefix}-${firstPost.slug}`} width={blogPostContainerWidth}>
					<BlogListingPostInfo key={`${keyPrefix}-${firstPost.slug}`} post={firstPost} />
				</Box>
				<Stack direction="column" spacing={6} width={blogPostContainerWidth}>
					{
						mastSelection.map((post) =>
							<Box key={`Box-${keyPrefix}-${post.slug}`}>
								<BlogListingPostInfo condensed={true} key={`${keyPrefix}-${post.slug}`} post={post} />
							</Box>
						)
					}
				</Stack>
			</Stack>
			<Typography alignSelf="start" fontWeight="bold" marginBottom={6} textAlign="start" variant="h4">More Recent Posts</Typography>
			<Box display="inline-flex" justifyContent="space-between" flexWrap="wrap">
			{
				restOfSelection.map((post, idx) => {
					return (
					<Box key={`Box-${keyPrefix}-${post.slug}`} marginBottom={6} width={{
						xs: "100%",
						sm: "100%",
						md: "100%",
						lg: "48%",
						xl: "48%"
					}}
					>
					<BlogListingPostInfo
						condensed={false}
						key={`${keyPrefix}-${post.slug}`}
						post={post}
					/>
					</Box>
				)
				})
			}
			</Box>
		</Stack>
	</Container>
	);
}

export default BlogListing;