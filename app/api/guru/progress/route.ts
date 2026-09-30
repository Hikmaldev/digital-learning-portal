import { jsonError, jsonOk } from "../../lib/helpers";
import { getRingkasanKelas, getMetrics } from "@/lib/queries";

/** GET /api/guru/progress?kelasId=... — ringkasan progress per siswa. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kelasId = searchParams.get("kelasId");

  if (!kelasId) {
    return jsonError("Parameter kelasId wajib diisi.", 400);
  }

  const [siswa, metrics] = await Promise.all([
    getRingkasanKelas(kelasId),
    getMetrics(kelasId),
  ]);

  return jsonOk({ siswa, metrics });
}

