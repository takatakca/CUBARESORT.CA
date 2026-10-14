import type { NextConfig } from "next";

// Security-header baseline copied from takatak-v1/next.config.ts so both apps
// answer with the same headers behind the same Coolify proxy. Strict CSP is
// deliberately deferred there and here: an untested policy breaks hydration
// and the Takatak Auth redirect flow. HSTS belongs at the platform level once
// the production domain is confirmed — DNS for cubaresort.ca is not pointed yet.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig: NextConfig = {
  // Keep Prisma out of the bundle so Node resolves the real package names.
  // Production builds MUST use webpack (`next build --webpack`), as in V1:
  // Next.js 16 Turbopack rewrites these to hashed aliases such as
  // `@prisma/client-<hash>` which do not exist in node_modules.
  serverExternalPackages: ["@prisma/client", "prisma", "@prisma/adapter-pg", "pg"],
  output: "standalone",
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
