/** @type {import('next').NextConfig} */
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
    path: process.env.NODE_ENV === 'development' ? 'http://localhost:6000/' : 'https://trades-trek-client.vercel.app/',
  },
  env: {
    baseApiUrl: 'https://energetic-bat-pants.cyclic.app',
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:6000' // development api
        : 'https://energetic-bat-pants.cyclic.app', // production api
  },
};

module.exports = nextConfig;
