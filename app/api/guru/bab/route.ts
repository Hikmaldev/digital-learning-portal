import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "../../lib/helpers";
import { getBabList } from "@/lib/queries";
import { getGuruSession, guruMemilikiKelas } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";
import { DatabaseUnavailableError } from "@/lib/runtime";

/** GET /api/guru/bab?kelasId= — daftar bab per kelas (untuk builder soal). */
export async function GET(request: NextRequest) {
  const kelasId = request.nextUrl.searchParams.get("kelasId");
  if (!kelasId) return jsonError("Parameter kelasId wajib diisi.", 400);

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (prisma && !(await guruMemilikiKelas(kelasId, guru.guruId))) {
    return jsonError("Kelas tidak ditemukan atau bukan milik Anda.", 403);
  }

  try {
    const bab = await getBabList(kelasId);
    return jsonOk({
      bab: bab.map((b) => ({
        id: b.id,
        judul: b.judul,
        mataPelajaran: b.mata_pelajaran,
        urutan: b.urutan,
      })),
    });
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) {
      return jsonError(error.message, 503);
    }
    return jsonError("Gagal mengambil daftar bab.", 500);
  }
}
