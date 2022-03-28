/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		images: {
			layoutRaw: true,
		},
	},
	images: {
		domains: [ "blog.buddiesofbudgie.org" ]
	},
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // Append the default value with md extensions
	reactStrictMode: true,
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
