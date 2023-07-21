const path = require("path");

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
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    domains: ["avatars.githubusercontent.com", "blog.buddiesofbudgie.org"],
    formats: ["image/avif", "image/webp"],
  },
  optimizeFonts: false, // Breaks Google Web Font loading
  output: "standalone",
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"], // Append the default value with md extensions
  reactStrictMode: true,
  transpilePackages: ["@buddiesofbudgie/ui"],
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDX(nextConfig);
