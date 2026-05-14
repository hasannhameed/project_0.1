import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "myanimelist.net" },
      { protocol: "https", hostname: "s4.anilist.co" },
      { protocol: "https", hostname: "img.anili.st" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:file(.+\\.(?:mp4|webm|jpg|jpeg|png|webp|avif|woff2))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
