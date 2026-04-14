import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** Avoid bundling nodemailer into the wrong graph (can cause obscure webpack runtime errors). */
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
