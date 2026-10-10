import { jsonOk } from "../../lib/helpers";
import { prisma } from "@/lib/prisma";

/** GET /api/guru/status — status infrastruktur (dipakai halaman login guru). */
export async function GET() {
  if (!prisma) {
    return jsonOk({ dbAktif: false, authAktif: false, error: "DATABASE_URL belum tersedia." });
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    return jsonOk({ dbAktif: true, authAktif: true });
  } catch {
    return jsonOk({ dbAktif: false, authAktif: false, error: "Neon tidak dapat dijangkau." });
  }
}