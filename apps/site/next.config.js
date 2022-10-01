const path = require("path");
const withTM = require("next-transpile-modules")(["@buddiesofbudgie/ui"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["blog.buddiesofbudgie.org"],
  },
  optimizeFonts: false, // Breaks Google Web Font loading
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"], // Append the default value with md extensions
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles", "scss")],
  },
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = withTM(withMDX(nextConfig));
