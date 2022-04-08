import { GetAllPosts, GetPostBySlug, GetPostTitle } from "../../common/ghost"
import { ParsedUrlQuery } from "querystring";
import { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import {
	GetStaticProps,
	GetStaticPaths,
} from "next/types"
import { CustomMetaProps } from "../../components/CustomMeta";

// MaterialUI Bits
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

// Our Components
import PageBase from "../../components/PageBase";
import { AuthorshipInfo } from "../../components/blog/AuthorshipInfo";

export const Post = (post : PostOrPage) => {
	const postTitle = GetPostTitle(post);
	const pageMeta : CustomMetaProps = {
		Title: postTitle,
	};

	return (
		<PageBase meta={pageMeta}>
			<Container maxWidth="lg">
				<Stack spacing={2}>
					<Typography fontWeight="bold" variant="h3">{GetPostTitle(post)}</Typography>
					{ post.excerpt && <Typography variant="h6">{post.excerpt}</Typography> }
					{ typeof post.feature_image === "string" &&
						<Box><Image alt={postTitle} className="featuredBlogImage" width={1920} height={1080} objectFit="scale-down" src={post.feature_image} /></Box>
					}
					<AuthorshipInfo post={post} />
					<Box className="customMarkdownStying" dangerouslySetInnerHTML={{__html : post.html ?? ""}} />
					</Stack>
				</Container>
		</PageBase>
	)
}

interface BlogSlugParams extends ParsedUrlQuery {
	slug : string;
}

// getStaticPaths will define all the paths to content that should be statically generated
export const getStaticPaths: GetStaticPaths = async() => {
	const allPosts = await GetAllPosts(); // Get all the posts from
	const slugs = allPosts.map(({ slug }) => ({ params: { slug } }));
	return {
		paths: slugs,
		fallback: true
	};
};

// getStaticProps will fetch the data of the blog post provided by the slug and return its properties
export const getStaticProps : GetStaticProps = async (context) => {
	const { slug } = context.params as BlogSlugParams;
	const props = await GetPostBySlug(slug); // Get the post for this slug
	return { props }
}

export default Post;