import { hotelRegions, hotels } from "@/lib/hotels";

// Prerendered at build time so the same route exists in both build targets,
// including the static export GitHub Pages serves.
//
// It therefore reports build-time facts only — what this release contains —
// and deliberately makes no claim about runtime database or auth connectivity,
// which a static file cannot know. The Coolify container's health check hits
// `/` instead. When the Node target goes live and runtime status is actually
// needed, give it its own dynamic route rather than making this one lie.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    status: "ok",
    app: "cubaresort",
    release: process.env.RELEASE_SHA ?? "local",
    buildTarget: process.env.BUILD_TARGET === "node" ? "node" : "static",
    directory: { properties: hotels.length, regions: hotelRegions.length },
    // No booking provider and no supplier feed are configured. This is the
    // site's real state, not a placeholder.
    bookingProvider: null,
    supplierFeed: null,
  });
}
