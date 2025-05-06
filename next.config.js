/** @type {import('next').NextConfig} */

const path = require("path");
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const nextConfig = {
  env: {
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_BASIC_URL: process.env.NEXT_PUBLIC_BASIC_URL,
    NEXT_PUBLIC_BASIC_INVOKE_URL: process.env.NEXT_PUBLIC_BASIC_INVOKE_URL,
    NEXT_PUBLIC_BASIC_INVOKE_STAGING_PREFIX_URL: process.env.NEXT_PUBLIC_BASIC_INVOKE_STAGING_PREFIX_URL,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL,
    NEXT_PUBLIC_YANDEX_MAP_KEY: process.env.NEXT_PUBLIC_YANDEX_MAP_KEY,
    NEXT_PUBLIC_YANDEX_MAP_SUGGEST_KEY: process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_KEY,
    NEXT_PUBLIC_CUSTOMER_TYPE_ID: process.env.NEXT_PUBLIC_CUSTOMER_TYPE_ID,
    NEXT_PUBLIC_EXPEDITOR_TYPE_ID: process.env.NEXT_PUBLIC_EXPEDITOR_TYPE_ID,
    NEXT_PUBLIC_DISPACR_TYPE_ID: process.env.NEXT_PUBLIC_DISPACR_TYPE_ID,
    NEXT_PUBLIC_ANALITIK_TYPE_ID: process.env.NEXT_PUBLIC_ANALITIK_TYPE_ID,
    NEXT_PUBLIC_DILLER_TYPE_ID: process.env.NEXT_PUBLIC_DILLER_TYPE_ID,
  },
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
