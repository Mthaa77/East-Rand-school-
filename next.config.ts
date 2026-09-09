import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    /* Serve AVIF first (≈25% smaller than WebP), WebP as fallback. */
    formats: ["image/avif", "image/webp"],
    /* Hero art uses a sharper cut (q=85) so its URL never collides with the
       lazy below-fold copies of the same photo — keeps the LCP warning quiet
       and the hero crisp. */
    qualities: [75, 85],
  },
  poweredByHeader: false,
};

export default nextConfig;
