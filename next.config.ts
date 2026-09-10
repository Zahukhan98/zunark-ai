import type { NextConfig } from "next";

// RIKAA is a separate Next.js app (own Railway service, own MySQL database,
// own Auth.js session) reverse-proxied in under /rikaa for an unlisted
// client demo — nothing on the public site links to it. Private Railway
// networking (the *.railway.internal hostname) keeps the traffic inside
// Railway's network instead of round-tripping through the public internet.
const RIKAA_UPSTREAM =
  process.env.RIKAA_UPSTREAM_URL || "http://rikaa.railway.internal:8080";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/rikaa", destination: `${RIKAA_UPSTREAM}/rikaa` },
      { source: "/rikaa/:path*", destination: `${RIKAA_UPSTREAM}/rikaa/:path*` },
    ];
  },
};

export default nextConfig;
