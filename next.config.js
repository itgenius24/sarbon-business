/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
        @import "./src/styles/mixins.scss";
        @import "./src/styles/unit.scss";
        @import "./src/styles/date-picker.scss";
        `,
  },
  images: {
    domains: ["cdn.u-code.io", "media.newyorker.com","flagcdn.com", "cdn-api.furgo.uz"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.u-code.io",
        port: "",
        pathname: "*/media/*",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "*/media/*",
      },
      {
        protocol: "https",
        hostname: "cdn-api.furgo.uz",
        port: "",
        pathname: "*/media/*",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
