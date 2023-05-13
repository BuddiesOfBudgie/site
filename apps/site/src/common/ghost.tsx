import GhostContentAPI from "@tryghost/content-api";
import type { PostOrPage, Tag } from "@tryghost/content-api";

const ourAPI = new GhostContentAPI({
  key: "a731339288014003c2846aca07",
  url: "https://blog.buddiesofbudgie.org",
  version: "v5.0",
});

export const GetAllPosts = async () => {
  return ourAPI.posts.browse({
    filter: "published_at:-null", // Don't include pages
    limit: "all", // ALl the pages
  });
};

export const GetAllPostsPaginated = async (page = 0, limit = 10, tag: Tag) => {
  return ourAPI.posts.browse({
    filter: `published_at:-null+tag:${tag.slug}`,
    include: ["authors", "tags"],
    limit: limit,
    page: page,
    order: "published_at DESC",
  });
};

export const GetPostBySlug = async (slug: string) => {
  return ourAPI.posts.read(
    { slug },
    {
      formats: ["html"],
      include: ["authors", "tags"],
    }
  );
};

export const GetPostTitle = (post: PostOrPage): string => {
  return post.title ?? post.og_title ?? post.meta_title ?? "No title defined";
};

export const GetTag = async (tag: string): Promise<Tag> => {
  const readTag = await ourAPI.tags.read({ slug: tag });
  return readTag;
};
