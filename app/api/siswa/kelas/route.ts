import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "../../lib/helpers";
import { getKelasByKode, getBabList } from "@/lib/queries";
import { DatabaseUnavailableError } from "@/lib/runtime";

/** GET /api/siswa/kelas?kode=&nama= — info kelas + daftar bab untuk siswa. */
export async function GET(request: NextRequest) {
  const kode = request.nextUrl.searchParams.get("kode");
  const nama = request.nextUrl.searchParams.get("nama")?.trim() || undefined;
  if (!kode) return jsonError("Parameter kode wajib diisi.", 400);

  try {
    const kelas = await getKelasByKode(kode.toUpperCase());
    if (!kelas) return jsonError("Kode kelas tidak ditemukan.", 404);
    const bab = await getBabList(kelas.id, nama);
    return jsonOk({ kelas, bab });
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) return jsonError(error.message, 503);
    return jsonError("Gagal mengambil data kelas.", 500);
  }
}
