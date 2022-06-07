/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["prod.cdn.bbaws.net", "s3-eu-west-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
