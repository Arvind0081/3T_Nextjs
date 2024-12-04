import { Routes } from './routes.js';

const nextConfig = {
  async rewrites()
  {
    return Routes().map(route => ({
      source: route.source,
      destination: route.destination,
    }));
  },
  webpack: (config, { isServer }) =>
  {
    if (isServer)
    {
      config.externals = ['semantic-ui-react', ...config.externals];
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'design.csdevhub.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '3t-api.csdevhub.com',
        pathname: '/images/**',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
