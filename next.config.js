/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.genius.com',
      },
      {
        protocol: 'https',
        hostname: 'images.rapgenius.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.genius.com',
      },
    ],
  },
}

module.exports = nextConfig
