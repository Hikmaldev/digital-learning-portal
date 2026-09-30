import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../lib/helpers";
import { simpanMateriSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

/** POST /api/guru/materi — simpan materi bab baru (teks + link video + sumber buku). */
export async function POST(request: NextRequest) {
  const body = await bacaBodyUtf8(request);
  const parsed = simpanMateriSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  }
  if (!prisma) {
    return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  }

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

  return jsonOk({ bab }, { status: 201 });
}

