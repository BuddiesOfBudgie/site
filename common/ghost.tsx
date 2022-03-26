import GhostContentAPI from "@tryghost/content-api";

const ourAPI = new GhostContentAPI({
	key: "c89868781940adbb9627aa9674",
	url: "https://blog.buddiesofbudgie.org",
	version: "v3"
});

/**
 * GetAllPosts will get all the posts we have published
 * @returns A Promise to provide all of our Posts
 */
export async function GetAllPosts() {
	return ourAPI.posts.browse({
		filter: "page:false,published_at:-null", // Don't include pages
		limit: "all" // ALl the pages
	});
}

/**
 * GetAllPostsPaginated will get all the published posts paginated by the requested page
 * @param page Our desired page for pagination. If not defined, default to 0
 * @returns A Promise to return our Posts
 */
export async function GetAllPostsPaginated(page ?: number) {
	return ourAPI.posts.browse({
		filter: "page:false,published_at:-null",
		limit: 5, // A featured blog post and 4 others
		page: page ?? 0
	})
}

/**
 * GetPostBySlug will get the post by the specified slug
 * @param slug Slug of the post
 * @returns A Promise to return the Post
 */
export async function GetPostBySlug(slug : string) {
	return ourAPI.posts.read(
		{ slug },
		{ formats: ["html"], include: "tags"}
	);
}