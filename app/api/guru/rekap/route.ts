import { NextRequest } from "next/server";
import { jsonError } from "../../lib/helpers";
import { prisma } from "@/lib/prisma";
import { getGuruSession, guruMemilikiKelas } from "@/lib/authorization";
import { getRekapLengkap } from "@/lib/queries";
import { bangunXlsxRekap, namaFileRekap } from "@/lib/rekap-xlsx";
import { DatabaseUnavailableError } from "@/lib/runtime";

/**
 * GET /api/guru/rekap?kelasId= — unduh rekap progress kelas sebagai Excel (.xlsx).
 *
 * Isi file (lihat lib/rekap-xlsx.ts):
 *  - Sheet "Ringkasan": info kelas + ringkasan per siswa.
 *  - Sheet "Rincian per Bab": semua siswa × semua bab (termasuk yang belum).
 * Lebar kolom & tinggi baris sudah diatur agar ringkas namun terbaca.
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

    const file = await bangunXlsxRekap(rekap);
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
