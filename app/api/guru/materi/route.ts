import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../lib/helpers";
import { simpanMateriSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { getGuruSession, guruMemilikiKelas } from "@/lib/authorization";
import { revalidatePath } from "next/cache";

/** POST /api/guru/materi — simpan materi bab baru (teks + link video + sumber buku). */
export async function POST(request: NextRequest) {
  const parsed = simpanMateriSchema.safeParse(await bacaBodyUtf8(request));
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  if (!prisma) return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (!(await guruMemilikiKelas(parsed.data.kelasId, guru.guruId))) {
    return jsonError("Kelas tidak ditemukan atau bukan milik Anda.", 403);
  }

  try {
    const data = parsed.data;
    const bab = await prisma.bab.create({
      data: {
        kelas_id: data.kelasId,
        mata_pelajaran: data.mataPelajaran,
        judul: data.judul,
        ringkasan: data.ringkasan || null,
        konten_materi: data.kontenMateri,
        url_video: data.urlVideo || null,
        link_sumber: data.linkSumber || null,
        urutan: data.urutan,
      },
    });
    revalidatePath("/guru/dashboard");
    revalidatePath("/guru/materi/baru");
    return jsonOk({ bab }, { status: 201 });
  } catch {
    return jsonError("Gagal menyimpan materi. Coba lagi.", 500);
  }
}
