/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Disables the Image Optimization API
    domains: ['cdn.pixabay.com'], // Allows images from specified domains
  },
};

module.exports = nextConfig; 