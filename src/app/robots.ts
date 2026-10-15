import type { MetadataRoute } from "next";

// Required by `output: "export"`: emitted as a file at build time.
export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://cubaresort.ca";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
