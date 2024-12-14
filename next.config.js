/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.namu.wiki',
      },
    ],
  },
}

module.exports = nextConfig
