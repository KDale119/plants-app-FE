/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'perenual.com',
        port: '',
        pathname: '/storage/species_image/**',
      },
    ],
  },
};

export default nextConfig;
