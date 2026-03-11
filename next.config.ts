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
      {
        protocol: 'https',
        hostname: 'admin.prothomashop.com',
        port: '',
        pathname: '/product/**',
      },
    ],
  },
}

module.exports = nextConfig