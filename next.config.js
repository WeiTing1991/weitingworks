/** @type {import('next').NextConfig} */
// const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
	reactStrictMode: true,
	images: {
		unoptimized: true, // Disable default image optimization
	},
	// assetPrefix: isProd ? '/weitingworks/' : '',
	basePath: "/weitingworks", // Matches your GitHub Pages URL (https://WeiTing1991.github.io/weitingworks/)
	output: "standalone",
	pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
	// distDir: "build",
};

module.exports = nextConfig;
