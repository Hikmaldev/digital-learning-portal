import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "../../../lib/helpers";
import { getSoalBab } from "@/lib/queries";
import { soalLatihan } from "@/lib/data";

/** GET /api/siswa/latihan/soal?babId= — soal untuk dikerjakan siswa.
 *  Jawaban benar (`is_benar`) tidak dikirim ke klien; penilaian terjadi
 *  di server saat submit. Tanpa database, memakai data contoh.
 */
export async function GET(request: NextRequest) {
  const babId = request.nextUrl.searchParams.get("babId");
  if (!babId) return jsonError("Parameter babId wajib diisi.", 400);

  const dariDb = await getSoalBab(babId);
  const sumber =
    dariDb ??
    soalLatihan.filter((s) => s.bab_id === babId).map((s) => ({
      id: s.id,
      pertanyaan: s.pertanyaan,
      opsi: s.opsi.map((o) => ({ id: o.id, teks: o.teks, is_benar: o.is_benar })),
    }));

  if (sumber.length === 0) {
    return jsonError("Soal belum tersedia untuk bab ini.", 404);
  }

  const bersih = sumber.map((s) => ({
    id: s.id,
    pertanyaan: s.pertanyaan,
    opsi: s.opsi.map(({ id, teks }) => ({ id, teks })),
  }));

  return jsonOk({ soal: bersih });
}