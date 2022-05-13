import GhostContentAPI, { PostOrPage, Tag } from "@tryghost/content-api";

const ourAPI = new GhostContentAPI({
	key: "a731339288014003c2846aca07",
	url: "https://blog.buddiesofbudgie.org",
	version: "v3"
});

/**
 * GetAllPosts will get all the posts we have published
 * @returns A Promise to provide all of our Posts
 */
export const GetAllPosts = async () => {
	return ourAPI.posts.browse({
		filter: "page:false,published_at:-null", // Don't include pages
		limit: "all" // ALl the pages
	});
}

/**
 * GetAllPostsPaginated will get all the published posts paginated by the requested page
 * @param page Desired page for pagination. If not defined, default to 0
 * @param limit Limit of posts. Defaults to 5 if not specified
 * @param tag Desired tag, if any. Defaults to just "news"
 * @returns A Promise to return our Posts
 */
export const GetAllPostsPaginated = async (page ?: number, limit ?: number, tag ?: string) => {
	tag = tag ?? "news";
	return ourAPI.posts.browse({
		filter: `page:false,published_at:-null,tag:${tag}`,
		include: ["authors", "tags"],
		limit: limit ?? 10,
		page: page ?? 0,
		order: "published_at DESC"
	})
}

/**
 * GetPostBySlug will get the post by the specified slug
 * @param slug Slug of the post
 * @returns A Promise to return the Post
 */
export const GetPostBySlug = async (slug : string) => {
	return ourAPI.posts.read(
		{ slug },
		{
			formats: ["html"],
			include: ["authors", "tags"],
		}
	);
}

/**
 * GetPostTitle will attempt to get the tile of a post or page
 * @param post Post or Page
 * @returns A string of the post title, or "No title defined"
 */
export const GetPostTitle = (post : PostOrPage) : string => {
	return post.title ?? post.og_title ?? post.meta_title ?? "No title defined";
}

/**
 * GetTag will get the tag based on a name
 * @param tag Tag slug name
 * @returns Tag
 * @throws Error
 */
export const GetTag = async (tag : string) : Promise<Error | Tag> => {
	try {
		const readTag = await ourAPI.tags.read({ slug: tag });
		return readTag;
	} catch (e) {
		return e;
	}
}