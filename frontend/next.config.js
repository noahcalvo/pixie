/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // produces the build as HTML/CSS/JS assets so plain firebase plan can host. Remove for SSR
  output: "export",
  // allows importing Markdown files using the raw-loader. This is to render README on the site
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
  // put the build in the build/ dir so that firebase knows where to find it.
  distDir: "build",
};

module.exports = nextConfig;
