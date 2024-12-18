/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.shopify.com"]
  },
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'], // Disable deprecation warnings, come back when we update the system
  }
};

export default nextConfig;
