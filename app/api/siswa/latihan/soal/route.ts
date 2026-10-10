import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "../../../lib/helpers";
import { getKelasByKode, getSoalBab } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { DatabaseUnavailableError } from "@/lib/runtime";

/** GET /api/siswa/latihan/soal?kode=&babId= — soal milik kelas siswa. */
export async function GET(request: NextRequest) {
  const babId = request.nextUrl.searchParams.get("babId");
  const kode = request.nextUrl.searchParams.get("kode");
  if (!babId || !kode) return jsonError("Parameter kode dan babId wajib diisi.", 400);

  try {
    const kelas = await getKelasByKode(kode);
    if (!kelas) return jsonError("Kode kelas tidak ditemukan.", 404);

    const dariDb = await getSoalBab(babId);
    if (!dariDb) return jsonError("Bab atau soal tidak ditemukan untuk kelas ini.", 404);

    const bab = await getKelasAndBabId(kelas.id, babId);
    if (!bab) return jsonError("Bab tidak termasuk dalam kelas ini.", 404);

    return jsonOk({
      soal: dariDb.map((s) => ({
        id: s.id,
        pertanyaan: s.pertanyaan,
        opsi: s.opsi.map(({ id, teks }) => ({ id, teks })),
      })),
    });
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) return jsonError(error.message, 503);
    return jsonError("Gagal mengambil soal.", 500);
  }
}

async function getKelasAndBabId(kelasId: string, babId: string) {
  if (!prisma) return null;
  return prisma.bab.findFirst({
    where: { id: babId, kelas_id: kelasId },
    select: { id: true },
  });
}
