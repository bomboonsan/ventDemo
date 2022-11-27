/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const withVideos = require('next-videos')

module.exports = withVideos()


if (process.env.NODE_ENV === 'development') {
  console.log('info  - lanUrl:', `http://${require('address').ip()}:3000`)
}

module.exports = {
  // assetPrefix: './',
  // basePath: '/project/vent',
  images: {
    unoptimized: true,
  },
}