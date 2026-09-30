import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../lib/helpers";
import { masukKelasSchema } from "@/lib/validations";
import { getKelasByKode } from "@/lib/queries";

/** POST /api/siswa/masuk — validasi kode kelas + nama (siswa tanpa akun). */
export async function POST(request: NextRequest) {
  const body = await bacaBodyUtf8(request);
  const parsed = masukKelasSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  }

  const kelas = await getKelasByKode(parsed.data.kodeKelas);
  if (!kelas) {
    return jsonError("Kode kelas tidak ditemukan.", 404);
  }

  return jsonOk({ kelas, namaSiswa: parsed.data.namaSiswa });
}

