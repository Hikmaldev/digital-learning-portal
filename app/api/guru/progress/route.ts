import { jsonError, jsonOk } from "../../lib/helpers";
import { getRingkasanKelas, getMetrics } from "@/lib/queries";
import { getGuruSession, guruMemilikiKelas } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";
import { DatabaseUnavailableError } from "@/lib/runtime";

/** GET /api/guru/progress?kelasId=... — ringkasan progress per siswa. */
export async function GET(request: Request) {
  const kelasId = new URL(request.url).searchParams.get("kelasId");
  if (!kelasId) return jsonError("Parameter kelasId wajib diisi.", 400);

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (prisma && !(await guruMemilikiKelas(kelasId, guru.guruId))) {
    return jsonError("Kelas tidak ditemukan atau bukan milik Anda.", 403);
  }

  try {
    const [siswa, metrics] = await Promise.all([
      getRingkasanKelas(kelasId),
      getMetrics(kelasId),
    ]);
    return jsonOk({ siswa, metrics });
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) return jsonError(error.message, 503);
    return jsonError("Gagal mengambil progress kelas.", 500);
  }
}
