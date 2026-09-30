import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "../../lib/helpers";
import { getBabList } from "@/lib/queries";

/** GET /api/guru/bab?kelasId= — daftar bab per kelas (untuk builder soal). */
export async function GET(request: NextRequest) {
  const kelasId = request.nextUrl.searchParams.get("kelasId");
  if (!kelasId) return jsonError("Parameter kelasId wajib diisi.", 400);

  const bab = await getBabList(kelasId);
  return jsonOk({
    bab: bab.map((b) => ({
      id: b.id,
      judul: b.judul,
      mataPelajaran: b.mata_pelajaran,
      urutan: b.urutan,
    })),
  });
}