import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../../lib/helpers";
import { submitLatihanSchema } from "@/lib/validations";
import { nilaiDanSimpanLatihan } from "@/lib/grading";
import { DatabaseUnavailableError } from "@/lib/runtime";
import { revalidatePath } from "next/cache";

/** POST /api/siswa/latihan/submit — nilai dan simpan progress atomik. */
export async function POST(request: NextRequest) {
  const parsed = submitLatihanSchema.safeParse(await bacaBodyUtf8(request));
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");

  try {
    const hasil = await nilaiDanSimpanLatihan(parsed.data);
    revalidatePath("/guru/progress");
    revalidatePath("/siswa/kelas");
    return jsonOk(hasil);
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) return jsonError(error.message, 503);
    if (error instanceof Error && /tidak ditemukan|tidak termasuk/i.test(error.message)) {
      return jsonError(error.message, 404);
    }
    return jsonError("Jawaban gagal disimpan. Silakan coba lagi.", 500);
  }
}
