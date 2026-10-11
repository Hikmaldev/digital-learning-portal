import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../lib/helpers";
import { kirimFeedbackSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

/** POST /api/siswa/feedback — simpan masukan siswa (tanpa akun). */
export async function POST(request: NextRequest) {
  const parsed = kirimFeedbackSchema.safeParse(await bacaBodyUtf8(request));
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  if (!prisma) return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);

  try {
    const kelas = parsed.data.kodeKelas
      ? await prisma.kelas.findUnique({
          where: { kode_akses: parsed.data.kodeKelas },
          select: { id: true },
        })
      : null;
    const feedback = await prisma.feedback.create({
      data: {
        kelas_id: kelas?.id ?? null,
        nama_siswa: parsed.data.namaSiswa || null,
        kategori: parsed.data.kategori,
        pesan: parsed.data.pesan,
        kontak: parsed.data.kontak || null,
      },
      select: { id: true },
    });
    return jsonOk({ feedback }, { status: 201 });
  } catch {
    return jsonError("Gagal mengirim masukan. Coba lagi.", 500);
  }
}
