import { NextResponse } from "next/server";
import { hotelRegions, hotels } from "@/lib/hotels";
import { isDatabaseConfigured } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

/**
 * Health endpoint, same shape as takatak-v1's /api/health so one uptime check
 * can watch both. "not_configured" is a truthful state, not a failure: without
 * Supabase and database env vars the app serves the directory from the bundled
 * dataset and reports exactly that.
 */
export function GET() {
  const supabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? "configured"
      : "not_configured";

  return NextResponse.json({
    status: "ok",
    app: "cubaresort.ca",
    database: isDatabaseConfigured() ? "configured" : "not_configured",
    supabase,
    directory: { properties: hotels.length, regions: hotelRegions.length },
    bookingProvider: process.env.CUBARESORT_BOOKING_PROVIDER || null,
    timestamp: new Date().toISOString(),
  });
}
