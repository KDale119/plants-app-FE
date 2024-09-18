/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'perenual.com',
        port: '',
        pathname: '/storage/species_image/**',
      },
    ],
    unoptimized: true
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.geojson$/,
      use: 'json-loader',
    });

    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
