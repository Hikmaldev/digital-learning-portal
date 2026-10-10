import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../lib/helpers";
import { simpanSoalSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { getGuruSession, guruMemilikiBab } from "@/lib/authorization";
import { revalidatePath } from "next/cache";

/** POST /api/guru/soal — simpan latihan soal pilihan ganda per bab. */
export async function POST(request: NextRequest) {
  const parsed = simpanSoalSchema.safeParse(await bacaBodyUtf8(request));
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  if (!prisma) return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (!(await guruMemilikiBab(parsed.data.babId, guru.guruId))) {
    return jsonError("Bab tidak ditemukan atau bukan milik Anda.", 403);
  }

  try {
    const { babId, soal } = parsed.data;
    const created = await prisma.$transaction(async (tx) => {
      const rows = [];
      for (const [i, s] of soal.entries()) {
        if (s.indexBenar >= s.opsi.length) {
          throw new Error("Index jawaban benar tidak valid.");
        }
        rows.push(
          await tx.soal.create({
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
          })
        );
      }
      return rows;
    });
    revalidatePath("/guru/dashboard");
    revalidatePath("/guru/soal/baru");
    return jsonOk({ jumlahSoal: created.length }, { status: 201 });
  } catch {
    return jsonError("Gagal menyimpan latihan. Tidak ada soal yang disimpan.", 500);
  }
}
