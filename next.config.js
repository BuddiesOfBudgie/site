import path from 'path';
import fs from 'fs';
import createMDX from '@next/mdx';

const blogs = fs.readdirSync(path.join('.', 'src', 'content', 'blog'));

const redirects = () => {
  const blogRedirects = blogs.map((b) => {
    const uri = path.basename(b).replace('.mdx', '');
    return {
      source: `/${uri}`,
      destination: `/blog/${uri}`,
      permanent: true,
    };
  });

  return [
    ...blogRedirects,
    {
      source: '/about/organization',
      destination: 'https://docs.buddiesofbudgie.org/organization/intro',
      permanent: true,
    },
    {
      source: '/rss',
      destination: '/feeds/news.xml',
      permanent: true,
    },
  ];
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    largePageDataBytes: 512 * 1000,
    //outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
  headers: async () => [
    {
      source: '/about/roadmap',
      headers: [
        {
          key: 'Cache-Control',
          value: 's-maxage=3600, stale-while-revalidate=59',
        },
      ],
    },
  ],
  images: {
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // Append the default value with md extensions
  reactStrictMode: true,
  redirects: async () => redirects(),
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});

export default withMDX(nextConfig);
