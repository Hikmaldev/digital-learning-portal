import { NextRequest } from "next/server";
import { jsonError } from "../../lib/helpers";
import { prisma } from "@/lib/prisma";
import { getGuruSession, guruMemilikiKelas } from "@/lib/authorization";
import { getRekapLengkap } from "@/lib/queries";
import { bangunCsvRekap, namaFileRekap } from "@/lib/rekap-csv";
import { DatabaseUnavailableError } from "@/lib/runtime";

/**
 * GET /api/guru/rekap?kelasId= — unduh rekap progress kelas sebagai CSV.
 *
 * Isi file (tiga bagian, lihat lib/rekap-csv.ts):
 *  1. Info kelas + waktu unduh.
 *  2. Ringkasan per siswa (bab selesai, persentase, rata-rata & nilai terbaik).
 *  3. Rincian semua bab untuk setiap siswa (termasuk yang belum dikerjakan).
 *
 * Dipisah dengan ";" + BOM supaya rapi dibuka di Excel Indonesia.
 */
export async function GET(request: NextRequest) {
  const kelasId = request.nextUrl.searchParams.get("kelasId");
  if (!kelasId) return jsonError("Parameter kelasId wajib diisi.", 400);

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (prisma && !(await guruMemilikiKelas(kelasId, guru.guruId))) {
    return jsonError("Kelas tidak ditemukan atau bukan milik Anda.", 403);
  }

  try {
    const rekap = await getRekapLengkap(kelasId);
    if (!rekap) return jsonError("Kelas tidak ditemukan.", 404);

    return new Response("\uFEFF" + bangunCsvRekap(rekap), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${namaFileRekap(rekap.info.kode_akses)}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) {
      return jsonError(error.message, 503);
    }
    return jsonError("Gagal menyiapkan rekap. Coba lagi.", 500);
  }
}
