import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: false,
  async headers() {
    return [
      { source: "/api/:path*", headers: [{ key: "Alt-Svc", value: "clear" }] }, // H3広告を無効化（Cloudflareが上書きする場合も）
    ];
  },
};

export default nextConfig;
