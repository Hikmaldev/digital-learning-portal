import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "../../lib/helpers";
import { getKelasByKode, getBabList } from "@/lib/queries";

/** GET /api/siswa/kelas?kode=HB2026 — info kelas + daftar bab untuk siswa. */
export async function GET(request: NextRequest) {
  const kode = request.nextUrl.searchParams.get("kode");
  if (!kode) return jsonError("Parameter kode wajib diisi.", 400);

  const kelas = await getKelasByKode(kode.toUpperCase());
  if (!kelas) return jsonError("Kode kelas tidak ditemukan.", 404);

  const bab = await getBabList(kelas.id);
  return jsonOk({ kelas, bab });
}