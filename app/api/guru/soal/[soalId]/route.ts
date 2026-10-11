import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../../lib/helpers";
import { ubahSoalSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { getGuruSession, guruMemilikiSoal } from "@/lib/authorization";
import { revalidatePath } from "next/cache";

interface Params {
  params: Promise<{ soalId: string }>;
}

/** PATCH /api/guru/soal/:soalId — ubah pertanyaan & opsi (wajib milik guru). */
export async function PATCH(request: NextRequest, { params }: Params) {
  const { soalId } = await params;
  const parsed = ubahSoalSchema.safeParse(await bacaBodyUtf8(request));
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  }
  if (!prisma) {
    return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  }

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (!(await guruMemilikiSoal(soalId, guru.guruId))) {
    return jsonError("Soal tidak ditemukan atau bukan milik Anda.", 403);
  }

  const { pertanyaan, opsi, indexBenar } = parsed.data;
  if (indexBenar >= opsi.length) {
    return jsonError("Index jawaban benar tidak valid.");
  }

  try {
    // Opsi yang dikirim dengan id harus benar-benar milik soal ini.
    const existing = await prisma.opsiJawaban.findMany({
      where: { soal_id: soalId },
      select: { id: true },
    });
    const idValid = new Set(existing.map((o) => o.id));
    for (const o of opsi) {
      if (o.id && !idValid.has(o.id)) {
        return jsonError("Opsi jawaban tidak dikenal.", 400);
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.soal.update({ where: { id: soalId }, data: { pertanyaan } });

      // Hapus opsi yang tidak lagi dipakai, sisakan id yang dipertahankan.
      const dipertahankan = opsi
        .filter((o) => o.id)
        .map((o) => o.id as string);
      if (dipertahankan.length > 0) {
        await tx.opsiJawaban.deleteMany({
          where: { soal_id: soalId, id: { notIn: dipertahankan } },
        });
      } else {
        await tx.opsiJawaban.deleteMany({ where: { soal_id: soalId } });
      }

      // Perbarui opsi lama, buat opsi baru — indexBenar menentukan kunci.
      for (const [idx, o] of opsi.entries()) {
        if (o.id) {
          await tx.opsiJawaban.update({
            where: { id: o.id },
            data: { teks: o.teks, is_benar: idx === indexBenar },
          });
        } else {
          await tx.opsiJawaban.create({
            data: { soal_id: soalId, teks: o.teks, is_benar: idx === indexBenar },
          });
        }
      }
    });

    revalidatePath("/guru/soal");
    revalidatePath("/guru/dashboard");
    return jsonOk({ diubah: true });
  } catch {
    return jsonError("Gagal menyimpan perubahan soal. Coba lagi.", 500);
  }
}

/** DELETE /api/guru/soal/:soalId — hapus soal beserta opsi & jawabannya. */
export async function DELETE(_request: NextRequest, { params }: Params) {
  const { soalId } = await params;
  if (!prisma) {
    return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  }

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (!(await guruMemilikiSoal(soalId, guru.guruId))) {
    return jsonError("Soal tidak ditemukan atau bukan milik Anda.", 403);
  }

  try {
    await prisma.soal.delete({ where: { id: soalId } });
    revalidatePath("/guru/soal");
    revalidatePath("/guru/dashboard");
    return jsonOk({ dihapus: true });
  } catch {
    return jsonError("Gagal menghapus soal. Coba lagi.", 500);
  }
}
