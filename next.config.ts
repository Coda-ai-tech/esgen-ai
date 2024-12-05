import type { NextConfig } from 'next';

const path = require('path');

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type",
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          }
        ],
      },
    ];
  },
  trailingSlash: false,
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles/')],
    silenceDeprecations: ['legacy-js-api', 'mixed-decls', 'color-functions', 'global-builtin', 'import'],
  },
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  output: 'standalone',
};

export default nextConfig;
