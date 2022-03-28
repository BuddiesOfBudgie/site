import { GetAllPosts, GetPostBySlug } from "../../common/ghost"
import { ParsedUrlQuery } from "querystring";
import { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import {
	GetStaticProps,
	GetStaticPaths,
} from "next/types"
import { CustomMetaProps } from "../../components/CustomMeta";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PageBase from "../../components/PageBase";
import { Typography } from "@mui/material";

export const Post = (post : PostOrPage) => {
	const author = post.authors?.at(0);
	const postTitle = post.title ?? post.og_title ?? post.meta_title ?? "Super Secret Blog Post?";
	const pageMeta : CustomMetaProps = {
		Title: postTitle,
	};

	return (
		<PageBase meta={pageMeta}>
			<Stack>
				<Typography variant="h1">{postTitle}</Typography>
				{ typeof post.feature_image === "string" &&
					<Box><Image alt={postTitle} className="featuredBlogImage" width={1920} height={1080} objectFit="scale-down" src={post.feature_image} /></Box>
				}
				<Stack direction="row">
					{
						typeof author?.profile_image === "string" &&
						<Image alt={author.name} width={60} height={60} objectFit="scale-down" src={author.profile_image} />
					}
					<Typography variant="subtitle1">{author?.name}</Typography>
					<Typography variant="subtitle2">{author?.bio?.toUpperCase()}</Typography>
				</Stack>
				<Box dangerouslySetInnerHTML={{__html : post.html ?? ""}} />
				</Stack>
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