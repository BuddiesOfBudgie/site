import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import type { BlogPostMeta, BlogTags } from '../types';
import { type BlogPost } from '../types';
import { F, G, N, pipe } from '@mobily/ts-belt';
import { DateTime } from 'luxon';

const postsDirectory = join(process.cwd(), 'src', 'content', 'blog');

export const getPostBySlug = (slug: string): BlogPost | null => {
  const fullPath = join(postsDirectory, `${slug}.mdx`);

  if (!existsSync(fullPath)) return null;
  const fileContent = readFileSync(fullPath, 'utf-8');

  const { content, data } = matter(fileContent);
  const meta = F.coerce<BlogPostMeta>(data);

  return {
    ...meta,
    content,
    id: slug,
  };
};

export const getPosts = (): BlogPost[] => {
  const fileNames = readdirSync(postsDirectory);
  return fileNames
    .reduce<BlogPost[]>((list, name) => {
      const info = getPostBySlug(name.replace('.mdx', ''));
      if (!info) return list;
      return [...list, info];
    }, [])
    .sort((a, b) => -DateTime.fromISO(a.publishDate).diff(DateTime.fromISO(b.publishDate)).milliseconds);
};

export const getPostsByTags = (posts: BlogPost[]): BlogTags => {
  const tags: BlogTags = {};
  posts.map((p) => {
    p.tags.forEach((t) => {
      if (!G.isUndefined(tags[t])) {
        tags[t].posts.push(p);
        // Basically have pages be the count of N / 10 plus either 0 or 1
        // ex. we want 3 pages for 22 posts: (22 / 10 = 2.2, floored to 2) + (22 % 10 = 2, clamped to 1)
        const divMod = pipe(N.divideWithModulo(tags[t].posts.length, 10), F.toMutable);
        tags[t].pages = Math.floor(divMod[0]) + N.clamp(divMod[1], 0, 1);
      } else {
        tags[t] = { posts: [p], pages: 1 };
      }
    });
  });

  return tags;
};
