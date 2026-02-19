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
    path: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  env: {
    baseApiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    secondaryUrl: process.env.NEXT_PUBLIC_SECONDARY_URL || '',
  },
};

module.exports = nextConfig;
