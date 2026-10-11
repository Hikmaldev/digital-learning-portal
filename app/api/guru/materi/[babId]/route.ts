import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../../lib/helpers";
import { ubahMateriSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { getGuruSession, guruMemilikiBab } from "@/lib/authorization";
import { revalidatePath } from "next/cache";

interface Params {
  params: Promise<{ babId: string }>;
}

/** PATCH /api/guru/materi/:babId — ubah materi bab (wajib milik guru). */
export async function PATCH(request: NextRequest, { params }: Params) {
  const { babId } = await params;
  const parsed = ubahMateriSchema.safeParse(await bacaBodyUtf8(request));
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  }
  if (!prisma) {
    return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  }

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (!(await guruMemilikiBab(babId, guru.guruId))) {
    return jsonError("Bab tidak ditemukan atau bukan milik Anda.", 403);
  }

  try {
    const data = parsed.data;
    const bab = await prisma.bab.update({
      where: { id: babId },
      data: {
        mata_pelajaran: data.mataPelajaran,
        judul: data.judul,
        ringkasan: data.ringkasan || null,
        konten_materi: data.kontenMateri,
        url_video: data.urlVideo || null,
        link_sumber: data.linkSumber || null,
        urutan: data.urutan,
      },
    });
    revalidatePath("/guru/materi");
    revalidatePath("/guru/dashboard");
    return jsonOk({ bab });
  } catch {
    return jsonError("Gagal menyimpan perubahan materi. Coba lagi.", 500);
  }
}

/** DELETE /api/guru/materi/:babId — hapus bab beserta soal & progresnya. */
export async function DELETE(_request: NextRequest, { params }: Params) {
  const { babId } = await params;
  if (!prisma) {
    return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  }

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (!(await guruMemilikiBab(babId, guru.guruId))) {
    return jsonError("Bab tidak ditemukan atau bukan milik Anda.", 403);
  }

  try {
    await prisma.bab.delete({ where: { id: babId } });
    revalidatePath("/guru/materi");
    revalidatePath("/guru/dashboard");
    return jsonOk({ dihapus: true });
  } catch {
    return jsonError("Gagal menghapus materi. Coba lagi.", 500);
  }
}
