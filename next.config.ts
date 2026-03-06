/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kolzsticks.github.io',
        port: '',
        pathname: '/Free-Ecommerce-Products-Api/**',
      },
    ],
  },
}

module.exports = nextConfig