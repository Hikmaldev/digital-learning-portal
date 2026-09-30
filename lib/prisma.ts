import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Singleton PrismaClient dengan driver adapter PostgreSQL (kompatibel Neon).
 *
 * Dibuat lazy dan diberi fallback `null` — aplikasi tetap bisa dijalankan
 * (mis. preview frontend) sebelum koneksi database diset di `.env`.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/** Abaikan placeholder agar prematur connect tidak terjadi (build/prerender). */
function urlSungguhan(url: string): boolean {
  try {
    const u = new URL(url);
    const placeholder =
      u.hostname === "host" ||
      u.username === "user" ||
      /user:password@/.test(url) ||
      !u.hostname.includes(".");
    return !placeholder;
  } catch {
    return false;
  }
}

export function createPrismaClient(): PrismaClient | null {
  const url = process.env.DATABASE_URL;
  if (!url || !urlSungguhan(url)) return null;

  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient | null =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}

export default prisma;