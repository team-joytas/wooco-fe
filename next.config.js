/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.namu.wiki',
      },
      {
        protocol: 'https',
        hostname: 'img.choroc.com',
      },
    ],
  },
}

module.exports = nextConfig
