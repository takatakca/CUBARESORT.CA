import type { MetadataRoute } from "next";

// Required by `output: "export"`: emitted as a file at build time.
export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://cubaresort.ca";

// One canonical URL. Per-region pages are not listed because they do not exist
// yet: the directory filters client-side through ?region=. Add entries here when
// real routes land, not before — a sitemap of 404s costs ranking.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${base}/`, changeFrequency: "weekly", priority: 1 }];
}
