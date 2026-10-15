import type { NextConfig } from "next";

// Two build targets from one source.
//
//   BUILD_TARGET=static (default) -> `output: "export"`, a plain `out/` folder.
//     This is what GitHub Pages serves today, which is the only host the site
//     is actually published on. Pages cannot run Node, so nothing here may
//     depend on a server at request time.
//
//   BUILD_TARGET=node -> `output: "standalone"` for the Coolify container on
//     the Contabo VPS, the same shape FOOD HUB uses. Switch to this once the
//     database, TAKATAK Auth and a supplier feed are provisioned — that is
//     when server rendering starts earning its keep.
//
// Keeping both honest matters: the directory is a bundled dataset, so a static
// export loses nothing today.
const target = process.env.BUILD_TARGET === "node" ? "node" : "static";

// GitHub project Pages serve from /CUBARESORT.CA/, so assets need the prefix.
// Empty for a custom domain or the Coolify container.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Security-header baseline copied from takatak-v1/next.config.ts. Headers only
// apply on the Node target; GitHub Pages serves its own and ignores these.
// Strict CSP is deliberately deferred there and here: an untested policy breaks
// hydration and the Takatak Auth redirect flow. HSTS belongs at the platform
// level once a production domain is confirmed.
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
  output: target === "node" ? "standalone" : "export",
  basePath: basePath || undefined,
  // Pages has no image optimizer behind it.
  images: { unoptimized: target === "static" },
  // Pages serves /path/ as /path/index.html.
  trailingSlash: target === "static",
  ...(target === "node"
    ? {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }
    : {}),
};

export default nextConfig;
