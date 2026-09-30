import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../../lib/helpers";
import { submitLatihanSchema } from "@/lib/validations";
import { nilaiDanSimpanLatihan } from "@/lib/grading";

/**
 * POST /api/siswa/latihan/submit
 * Menerima jawaban, menilai otomatis (auto-grading), menyimpan progress.
 */
export async function POST(request: NextRequest) {
  const body = await bacaBodyUtf8(request);
  const parsed = submitLatihanSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  }

  const hasil = await nilaiDanSimpanLatihan(parsed.data);
  return jsonOk(hasil);
}

