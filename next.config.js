/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.prothomashop.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.prothomashop.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kolzsticks.github.io',
        port: '',
        pathname: '/Free-Ecommerce-Products-Api/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    // Disable optimization to avoid private IP blocking
    unoptimized: true,
  },
}

module.exports = nextConfig