/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    TOKEN:
      "pk.eyJ1IjoibGVnZW5kMjAwMCIsImEiOiJjbDJ0YXVpZWMwMmk0M2dvMjg5ajAybHJ3In0.RTlPzNJfcCNTJshHxxuilw",
  },
};

module.exports = nextConfig;
