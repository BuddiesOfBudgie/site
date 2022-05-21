const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		images: {
			layoutRaw: true,
		},
	},
	images: {
		dangerouslyAllowSVG: true,
		domains: [ "blog.buddiesofbudgie.org" ]
	},
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // Append the default value with md extensions
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles", "scss")],
	}
}

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
		providerImportSource: "@mdx-js/react",
	}
})

module.exports = withMDX(nextConfig)
