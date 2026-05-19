import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // External anime CDNs (MAL, AniList) already serve sized, cached images.
    // Disable Next's optimizer so we don't burn Vercel's image-optimization
    // quota and don't depend on a server fetch that MAL sometimes 403s.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "myanimelist.net" },
      { protocol: "https", hostname: "s4.anilist.co" },
      { protocol: "https", hostname: "img.anili.st" },
    ],
  },
  async redirects() {
    return [
      // Old anime homepage path → now lives at root
      { source: "/home", destination: "/", permanent: true },
    ];
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
