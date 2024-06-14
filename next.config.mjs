/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "https://unsplash.com/photos/a-table-topped-with-lots-of-dishes-and-utensils-u34GMeTQ4X0",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "https://unsplash.com/photos/a-table-topped-with-lots-of-dishes-and-utensils-u34GMeTQ4X0",
    ],
  },
};

export default nextConfig;
