
import { Routes } from './routes.mjs';


const nextConfig = {
  // Disable Turbopack by explicitly setting the bundler to Webpack
  reactStrictMode: false,
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = ['semantic-ui-react', ...config.externals];}
    // } else {
    //   config.module.rules.push({
    //     test: /\.css$/,
    //     use: ['style-loader', 'css-loader?modules=true'], // Enabling CSS Modules
    //   });
    // }
    return config;
  },
  
  // Image domain configuration (this is fine)
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
  
  // Rewrites configuration
  async rewrites() {
    return Routes().map((route) => ({
      source: route.source,
      destination: route.destination,
    }));
  },
};

export default nextConfig;
