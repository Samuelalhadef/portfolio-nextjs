/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cdn.jsdelivr.net'], // For loading Earth texture from CDN
    },
    // Ensure we can use external libraries that depend on browser APIs in SSR
    webpack: (config) => {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
      return config;
    },
  }
  
  module.exports = nextConfig