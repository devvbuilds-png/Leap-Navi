/** @type {import('next').NextConfig} */
const nextConfig = {
  // pdf-parse is a CommonJS dep used only in API routes (Node runtime)
  experimental: { serverComponentsExternalPackages: ["pdf-parse"] },
};
export default nextConfig;
