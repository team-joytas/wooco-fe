/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.choroc.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.wooco.kr',
      },
      {
        protocol: 'https',
        hostname: 'wooco-prod-s3.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
