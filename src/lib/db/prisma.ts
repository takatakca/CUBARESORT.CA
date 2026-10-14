import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Single Prisma instance per process. Next.js hot-reloads modules in dev, which
// would otherwise open a new pool on every edit until Postgres refuses more
// connections. Same pattern as takatak-v1.
declare global {
  var cubaresortPrisma: PrismaClient | undefined;
}

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Without it CUBARESORT runs in foundation mode and must not call the database.",
    );
  }
  const adapter = new PrismaPg({
    connectionString,
    max: Number(process.env.PRISMA_POOL_MAX ?? 5),
    ssl:
      process.env.PGSSL_REJECT_UNAUTHORIZED === "false"
        ? { rejectUnauthorized: false }
        : undefined,
  });
  return new PrismaClient({ adapter });
}

/** True when the database is configured. Lets pages degrade instead of crashing. */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DIRECT_URL);
}

export const prisma: PrismaClient =
  globalThis.cubaresortPrisma ?? (isDatabaseConfigured() ? createClient() : (undefined as never));

if (process.env.NODE_ENV !== "production" && isDatabaseConfigured()) {
  globalThis.cubaresortPrisma = prisma;
}
