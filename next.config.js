/** @type {import('next').NextConfig} */

const url = 'https://tiny-tan-boa-belt.cyclic.app'
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'imgix',
    path: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : 'https://client-staging-green.vercel.app',
  },
  env: {
    baseApiUrl: url,
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000' // development api
        : url, // production api
  },
};

module.exports = nextConfig;
