import { NextRequest } from "next/server";
import { jsonError } from "../../lib/helpers";
import { prisma } from "@/lib/prisma";
import { getGuruSession, guruMemilikiKelas } from "@/lib/authorization";
import { getRekapKelas } from "@/lib/queries";
import { DatabaseUnavailableError } from "@/lib/runtime";

/** Bungkus nilai CSV agar aman untuk pemisah ; dan tanda kutip. */
function kolom(nilai: string | number): string {
  const teks = String(nilai);
  return /[";\r\n]/.test(teks) ? `"${teks.replace(/"/g, '""')}"` : teks;
}

/**
 * GET /api/guru/rekap?kelasId= — unduh rekap progress kelas sebagai CSV.
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
    const kelas = await prisma!.kelas.findUnique({
      where: { id: kelasId },
      select: { nama_kelas: true },
    });
    const baris = await getRekapKelas(kelasId);

    const header = [
      "Nama Siswa",
      "Mata Pelajaran",
      "Bab",
      "Soal Dijawab",
      "Total Soal",
      "Skor",
      "Status",
      "Terakhir Mengerjakan",
    ];
    const isi = [
      header.join(";"),
      ...baris.map((r) =>
        [
          kolom(r.nama_siswa),
          kolom(r.mata_pelajaran),
          kolom(r.judul),
          r.dijawab,
          r.total_soal,
          r.skor,
          r.selesai ? "Selesai" : "Belum selesai",
          kolom(r.waktu),
        ].join(";")
      ),
    ].join("\r\n");

    const namaKelas = (kelas?.nama_kelas ?? "kelas")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const namaFile = `rekap-${namaKelas || "kelas"}-${new Date().toISOString().slice(0, 10)}.csv`;

    return new Response("\uFEFF" + isi, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${namaFile}"`,
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
