import { jsonOk } from "../../lib/helpers";
import { prisma } from "@/lib/prisma";

/** GET /api/guru/status — status infrastruktur (dipakai halaman login guru). */
export async function GET() {
  return jsonOk({
    dbAktif: prisma !== null,
    authAktif: prisma !== null,
  });
}