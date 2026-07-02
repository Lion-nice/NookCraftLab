/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/NookCraftLab" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/NookCraftLab/" : "",
}

export default nextConfig
