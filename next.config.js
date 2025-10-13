/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'encrypted-tbn0.gstatic.com',
      'picsum.photos',
      'instagram.com',
      'www.instagram.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.photos',
      },
      {
        protocol: 'https',
        hostname: '**.instagram.com',
      },
    ],
  },
}

module.exports = nextConfig