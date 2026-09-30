import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../lib/helpers";
import { simpanSoalSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

/** POST /api/guru/soal — simpan latihan soal pilihan ganda per bab. */
export async function POST(request: NextRequest) {
  const body = await bacaBodyUtf8(request);
  const parsed = simpanSoalSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  }
  if (!prisma) {
    return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  }

  const { babId, soal } = parsed.data;
  for (const [i, s] of soal.entries()) {
    await prisma.soal.create({
      data: {
        bab_id: babId,
        pertanyaan: s.pertanyaan,
        tipe: "PILIHAN_GANDA",
        urutan: i + 1,
        opsi: {
          create: s.opsi.map((o, idx) => ({
            teks: o.teks,
            is_benar: idx === s.indexBenar,
          })),
        },
      },
    });
  }

  return jsonOk({ jumlahSoal: soal.length }, { status: 201 });
}

