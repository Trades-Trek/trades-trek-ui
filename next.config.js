/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    loader: 'imgix',
    path: 'https://trades-trek-prod.vercel.app' || 'http://localhost:3000',
  },
  env: {
    baseApiUrl: 'https://api.tradestrek.com' || 'http://localhost:5000',
  },
  publicRuntimeConfig: {
    apiUrl: 'https://api.tradestrek.com' || 'http://localhost:5000',
    secondaryUrl: process.env.NEXT_PUBLIC_SECONDARY_URL || '',
  },
};

module.exports = nextConfig;
